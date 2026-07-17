import { allData, pool } from '../data';
import { studyDeck } from '../game/learning';
import type { LearningStore } from '../storage';

export interface StudyCallbacks {
  getLearning: () => LearningStore;
  onGrade: (key: string, knewIt: boolean) => void;
}

/** Flashcard mode: see the expansion, recall the acronym, self-grade. */
export class Study {
  private card = document.getElementById('study-card') as HTMLElement;
  private callbacks: StudyCallbacks;
  private deck: string[] = [];
  private position = 0;
  private reviewed = 0;

  constructor(callbacks: StudyCallbacks) {
    this.callbacks = callbacks;
  }

  start(): void {
    const deck = studyDeck(pool(), this.callbacks.getLearning());
    // Fisher-Yates shuffle.
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    this.deck = deck;
    this.position = 0;
    this.reviewed = 0;
    this.showPrompt();
  }

  private el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className?: string,
    text?: string,
  ): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  private currentKey(): string {
    return this.deck[this.position % this.deck.length];
  }

  private showPrompt(): void {
    const entry = allData()[this.currentKey()];
    this.card.innerHTML = '';
    this.card.appendChild(this.el('div', 'study-prompt-label', 'What is the acronym for'));
    this.card.appendChild(this.el('div', 'study-expansion', entry.expansion));
    const chips = this.el('div', 'chip-row');
    chips.appendChild(this.el('span', 'chip accent', entry.category));
    chips.appendChild(this.el('span', 'chip', entry.difficulty));
    this.card.appendChild(chips);
    const reveal = this.el('button', 'primary-btn', 'Reveal');
    reveal.addEventListener('click', () => this.showAnswer());
    this.card.appendChild(reveal);
    this.card.appendChild(this.el('div', 'study-progress', `${this.reviewed} reviewed this session`));
  }

  private showAnswer(): void {
    const key = this.currentKey();
    const entry = allData()[key];
    this.card.innerHTML = '';
    this.card.appendChild(this.el('div', 'study-prompt-label', entry.expansion));
    this.card.appendChild(this.el('div', 'study-answer', entry.display));
    this.card.appendChild(this.el('p', undefined, entry.explanation));

    const grade = this.el('div', 'study-grade');
    const knew = this.el('button', 'ghost-btn', 'Knew it');
    knew.addEventListener('click', () => this.next(true));
    grade.appendChild(knew);
    const missedBtn = this.el('button', 'ghost-btn missed', 'Missed it');
    missedBtn.addEventListener('click', () => this.next(false));
    grade.appendChild(missedBtn);
    this.card.appendChild(grade);
    this.card.appendChild(this.el('div', 'study-progress', `${this.reviewed} reviewed this session`));
  }

  private next(knewIt: boolean): void {
    this.callbacks.onGrade(this.currentKey(), knewIt);
    this.reviewed += 1;
    this.position += 1;
    this.showPrompt();
  }
}
