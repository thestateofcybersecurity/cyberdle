import { applyGuess, createGame } from './game/engine';
import type { GameState } from './game/engine';
import { keyboardStates, scoreGuess } from './game/scorer';
import { dailyIndex, localDateString, puzzleNumber } from './game/daily';
import { recordResult } from './game/stats';
import { recordOutcome, missedKeys } from './game/learning';
import { CATEGORIES, MAX_GUESSES } from './game/types';
import type { Category, Difficulty } from './game/types';
import { allData, getEntry, pool } from './data';
import {
  loadDailyProgress,
  loadLearning,
  loadResults,
  loadSettings,
  loadStats,
  saveDailyProgress,
  saveLearning,
  saveResults,
  saveSettings,
  saveStats,
} from './storage';
import { Board } from './ui/board';
import { Keyboard } from './ui/keyboard';
import { Glossary } from './ui/glossary';
import { Study } from './ui/study';
import { buildArchiveModal } from './ui/archive';
import {
  buildEndModal,
  buildHelpModal,
  buildSettingsModal,
  buildStatsModal,
  closeModal,
  initModalChrome,
  openModal,
} from './ui/modals';
import { copyShare, shareText } from './ui/share';
import { toast } from './ui/toast';
import { applyColorblind, applyTheme } from './ui/theme';

type Mode = 'daily' | 'practice' | 'archive';
type View = 'daily' | 'practice' | 'study' | 'glossary';

let settings = loadSettings();
let stats = loadStats();
let learning = loadLearning();
let results = loadResults();
let view: View = 'daily';
let mode: Mode = 'daily';
let currentPuzzleNum = 0; // for daily/archive modes
let answerKey = '';
let game: GameState;
let currentInput = '';
let revealing = false;

const board = new Board(document.getElementById('game-board')!);
let keyboard: Keyboard;
let glossary: Glossary;
let study: Study;

const todayString = () => localDateString(new Date());
const todayPuzzle = () => puzzleNumber(todayString());

const byId = (id: string) => document.getElementById(id) as HTMLElement;

function practiceFilter(): { difficulty?: Difficulty; category?: Category } {
  const difficulty = (byId('filter-difficulty') as HTMLSelectElement).value;
  const category = (byId('filter-category') as HTMLSelectElement).value;
  return {
    ...(difficulty ? { difficulty: difficulty as Difficulty } : {}),
    ...(category && category !== '__missed' ? { category: category as Category } : {}),
  };
}

function setStatusLine(): void {
  const el = byId('status-line');
  if (view === 'glossary' || view === 'study') {
    el.innerHTML = view === 'glossary' ? 'reference deck' : 'flashcard drill<span class="sep">//</span>misses come up more often';
    return;
  }
  const entry = getEntry(answerKey);
  const hard = settings.hardMode ? '<span class="sep">//</span>hard mode' : '';
  if (mode === 'daily') {
    el.innerHTML = `puzzle #${currentPuzzleNum}<span class="sep">//</span>${game.answer.length} chars${hard}`;
  } else if (mode === 'archive') {
    el.innerHTML = `archive #${currentPuzzleNum}<span class="sep">//</span>${game.answer.length} chars${hard}`;
  } else {
    el.innerHTML = `practice<span class="sep">//</span>${entry.difficulty}<span class="sep">//</span>${game.answer.length} chars${hard}`;
  }
}

function renderGame(): void {
  board.build(MAX_GUESSES, game.answer.length);
  game.guesses.forEach((guess, i) => {
    void board.reveal(i, guess, scoreGuess(guess, game.answer), false);
  });
  keyboard.setStates(keyboardStates(game.guesses, game.answer));
  setStatusLine();
}

function answerForPuzzle(puzzleNum: number): string {
  const keys = pool();
  return keys[dailyIndex(puzzleNum, keys.length)];
}

function startDaily(): void {
  mode = 'daily';
  currentPuzzleNum = todayPuzzle();
  answerKey = answerForPuzzle(currentPuzzleNum);
  game = createGame(answerKey);
  currentInput = '';
  const saved = loadDailyProgress(currentPuzzleNum);
  if (saved) {
    for (const guess of saved.guesses) {
      const result = applyGuess(game, guess);
      if (!result.error) game = result.state;
    }
  }
  keyboard.reset();
  renderGame();
  if (game.status !== 'playing') {
    showEndModal();
  }
}

function startArchive(puzzleNum: number): void {
  mode = 'archive';
  currentPuzzleNum = puzzleNum;
  answerKey = answerForPuzzle(puzzleNum);
  game = createGame(answerKey);
  currentInput = '';
  keyboard.reset();
  setView('daily', false);
  renderGame();
  toast(`Archive puzzle #${puzzleNum}`);
}

function startPractice(): void {
  mode = 'practice';
  const categoryValue = (byId('filter-category') as HTMLSelectElement).value;
  let keys: string[];
  if (categoryValue === '__missed') {
    const missed = new Set(missedKeys(learning));
    keys = pool(practiceFilter()).filter((key) => missed.has(key));
    if (keys.length === 0) {
      toast('Nothing to review: no missed acronyms yet');
      return;
    }
  } else {
    keys = pool(practiceFilter());
    if (keys.length === 0) {
      toast('No acronyms match those filters');
      return;
    }
  }
  answerKey = keys[Math.floor(Math.random() * keys.length)];
  game = createGame(answerKey);
  currentInput = '';
  keyboard.reset();
  renderGame();
}

function setView(next: View, restart = true): void {
  view = next;
  for (const tab of ['daily', 'practice', 'study', 'glossary'] as const) {
    byId(`tab-${tab}`).setAttribute('aria-selected', String(tab === next));
  }
  const gameVisible = next === 'daily' || next === 'practice';
  byId('game-board').hidden = !gameVisible;
  byId('keyboard').parentElement!.hidden = !gameVisible;
  byId('practice-bar').hidden = next !== 'practice';
  byId('glossary-panel').hidden = next !== 'glossary';
  byId('study-panel').hidden = next !== 'study';

  if (next === 'glossary') {
    glossary.render();
    setStatusLine();
  } else if (next === 'study') {
    study.start();
    setStatusLine();
  } else if (restart) {
    if (next === 'daily') startDaily();
    else startPractice();
  }
}

function relatedEntries(key: string): Array<{ key: string; display: string }> {
  const data = allData();
  const category = data[key].category;
  const candidates = Object.keys(data).filter((k) => k !== key && data[k].category === category);
  const picks: Array<{ key: string; display: string }> = [];
  while (picks.length < 3 && candidates.length > 0) {
    const [candidate] = candidates.splice(Math.floor(Math.random() * candidates.length), 1);
    picks.push({ key: candidate, display: data[candidate].display });
  }
  return picks;
}

function showEndModal(): void {
  const entry = getEntry(answerKey);
  const won = game.status === 'won';
  openModal(won ? 'ACCESS GRANTED' : 'ACCESS DENIED', (body) =>
    buildEndModal(body, {
      state: game,
      entry,
      daily: mode === 'daily',
      related: relatedEntries(answerKey),
      onRelated: (key) => {
        closeModal();
        setView('glossary');
        glossary.focusEntry(key);
      },
      onShare: async () => {
        const ok = await copyShare(
          shareText(game, currentPuzzleNum, settings.hardMode, settings.colorblind),
        );
        toast(ok ? 'Copied to clipboard' : 'Could not access the clipboard');
      },
      onNewGame: () => {
        closeModal();
        if (mode === 'archive') setView('daily');
        else startPractice();
      },
    }),
  );
}

async function submitGuess(): Promise<void> {
  const rowIndex = game.guesses.length;
  const result = applyGuess(game, currentInput, settings.hardMode);
  if (result.error) {
    board.shake(rowIndex);
    toast(result.error);
    return;
  }
  revealing = true;
  game = result.state;
  currentInput = '';
  const guess = game.guesses[rowIndex];

  if (mode === 'daily') {
    saveDailyProgress({ puzzleNum: currentPuzzleNum, guesses: game.guesses, status: game.status });
  }

  await board.reveal(rowIndex, guess, scoreGuess(guess, game.answer));
  keyboard.setStates(keyboardStates(game.guesses, game.answer));
  revealing = false;

  if (game.status === 'won') {
    board.celebrate(rowIndex);
    finishGame(rowIndex + 1);
  } else if (game.status === 'lost') {
    finishGame(null);
  }
}

function finishGame(wonInGuesses: number | null): void {
  learning = recordOutcome(learning, answerKey, wonInGuesses !== null);
  saveLearning(learning);
  if (mode === 'daily') {
    stats = recordResult(stats, currentPuzzleNum, wonInGuesses);
    saveStats(stats);
  }
  if (mode === 'daily' || mode === 'archive') {
    results = { ...results, [String(currentPuzzleNum)]: wonInGuesses };
    saveResults(results);
  }
  setTimeout(showEndModal, wonInGuesses !== null ? 900 : 400);
}

function handleKey(key: string): void {
  if (view === 'glossary' || view === 'study') return;
  if (revealing || game.status !== 'playing') return;
  if (key === 'ENTER') {
    void submitGuess();
  } else if (key === 'BACK') {
    currentInput = currentInput.slice(0, -1);
    board.setInput(game.guesses.length, currentInput);
  } else if (/^[A-Z0-9]$/.test(key) && currentInput.length < game.answer.length) {
    currentInput += key;
    board.setInput(game.guesses.length, currentInput);
  }
}

function openArchive(): void {
  openModal('Archive', (body) =>
    buildArchiveModal(body, {
      todayPuzzle: todayPuzzle(),
      results,
      maxGuesses: MAX_GUESSES,
      onPlay: (puzzleNum) => {
        closeModal();
        startArchive(puzzleNum);
      },
    }),
  );
}

function initChrome(): void {
  initModalChrome();
  applyTheme(settings.theme);
  applyColorblind(settings.colorblind);

  const categorySelect = byId('filter-category') as HTMLSelectElement;
  for (const category of CATEGORIES) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  }

  byId('tab-daily').addEventListener('click', () => setView('daily'));
  byId('tab-practice').addEventListener('click', () => setView('practice'));
  byId('tab-study').addEventListener('click', () => setView('study'));
  byId('tab-glossary').addEventListener('click', () => setView('glossary'));
  byId('btn-new-game').addEventListener('click', startPractice);
  byId('filter-difficulty').addEventListener('change', startPractice);
  byId('filter-category').addEventListener('change', startPractice);
  byId('btn-archive').addEventListener('click', openArchive);

  byId('btn-help').addEventListener('click', () => openModal('How to play', buildHelpModal));
  byId('btn-stats').addEventListener('click', () =>
    openModal('Statistics', (body) => buildStatsModal(body, stats)),
  );
  byId('btn-settings').addEventListener('click', () =>
    openModal('Settings', (body) =>
      buildSettingsModal(body, {
        hardMode: settings.hardMode,
        lightTheme: settings.theme === 'light',
        colorblind: settings.colorblind,
        onHardMode: (on) => {
          settings = { ...settings, hardMode: on };
          saveSettings(settings);
          setStatusLine();
        },
        onLightTheme: (on) => {
          settings = { ...settings, theme: on ? 'light' : 'dark' };
          saveSettings(settings);
          applyTheme(settings.theme);
        },
        onColorblind: (on) => {
          settings = { ...settings, colorblind: on };
          saveSettings(settings);
          applyColorblind(on);
        },
      }),
    ),
  );

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (!byId('modal-backdrop').hidden) return;
    const target = event.target as HTMLElement;
    if (target instanceof HTMLSelectElement || target instanceof HTMLInputElement) return;
    const key = event.key.toUpperCase();
    if (key === 'ENTER') handleKey('ENTER');
    else if (key === 'BACKSPACE') handleKey('BACK');
    else if (/^[A-Z0-9]$/.test(key)) handleKey(key);
  });
}

function registerServiceWorker(): void {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
    // Offline support is best-effort; the game works without it.
  });
}

function main(): void {
  if (Object.keys(allData()).length === 0) {
    toast('Acronym data failed to load');
    return;
  }
  keyboard = new Keyboard(byId('keyboard'), handleKey);
  glossary = new Glossary(() => learning);
  study = new Study({
    getLearning: () => learning,
    onGrade: (key, knewIt) => {
      learning = recordOutcome(learning, key, knewIt);
      saveLearning(learning);
    },
  });
  initChrome();
  const firstVisit = stats.played === 0 && localStorage.getItem('cyberdle:seen') === null;
  startDaily();
  if (firstVisit) {
    localStorage.setItem('cyberdle:seen', '1');
    openModal('How to play', buildHelpModal);
  }
  registerServiceWorker();
}

main();
