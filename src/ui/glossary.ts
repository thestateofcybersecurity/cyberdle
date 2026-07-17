import { allData } from '../data';
import { CATEGORIES } from '../game/types';
import { missedKeys } from '../game/learning';
import type { LearningStore } from '../storage';

export class Glossary {
  private list = document.getElementById('glossary-list') as HTMLElement;
  private search = document.getElementById('glossary-search') as HTMLInputElement;
  private category = document.getElementById('glossary-category') as HTMLSelectElement;
  private difficulty = document.getElementById('glossary-difficulty') as HTMLSelectElement;
  private count = document.getElementById('glossary-count') as HTMLElement;
  private getLearning: () => LearningStore;

  constructor(getLearning: () => LearningStore) {
    this.getLearning = getLearning;
    for (const category of CATEGORIES) {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      this.category.appendChild(option);
    }
    this.search.addEventListener('input', () => this.render());
    this.category.addEventListener('change', () => this.render());
    this.difficulty.addEventListener('change', () => this.render());
  }

  /** Jump to a specific acronym (used by "more in this category" links). */
  focusEntry(key: string): void {
    this.search.value = key;
    this.category.value = '';
    this.difficulty.value = '';
    this.render(key);
  }

  render(openKey?: string): void {
    const data = allData();
    const missed = new Set(missedKeys(this.getLearning()));
    const term = this.search.value.trim().toLowerCase();
    const category = this.category.value;
    const difficulty = this.difficulty.value;

    const keys = Object.keys(data)
      .filter((key) => {
        const entry = data[key];
        if (category && entry.category !== category) return false;
        if (difficulty && entry.difficulty !== difficulty) return false;
        if (!term) return true;
        return (
          key.toLowerCase().includes(term) ||
          entry.display.toLowerCase().includes(term) ||
          entry.expansion.toLowerCase().includes(term) ||
          entry.explanation.toLowerCase().includes(term)
        );
      })
      .sort();

    this.count.textContent = `${keys.length} of ${Object.keys(data).length} acronyms`;
    this.list.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (const key of keys) {
      const entry = data[key];
      const details = document.createElement('details');
      details.className = 'glossary-entry';
      if (key === openKey) details.open = true;

      const summary = document.createElement('summary');
      const keyEl = document.createElement('span');
      keyEl.className = 'glossary-key';
      keyEl.textContent = entry.display;
      summary.appendChild(keyEl);
      const expansionEl = document.createElement('span');
      expansionEl.className = 'glossary-expansion';
      expansionEl.textContent = entry.expansion;
      summary.appendChild(expansionEl);
      if (missed.has(key)) {
        const flag = document.createElement('span');
        flag.className = 'glossary-missed';
        flag.textContent = 'review';
        summary.appendChild(flag);
      }
      details.appendChild(summary);

      const detail = document.createElement('div');
      detail.className = 'glossary-detail';
      const chips = document.createElement('div');
      chips.className = 'chip-row';
      const categoryChip = document.createElement('span');
      categoryChip.className = 'chip accent';
      categoryChip.textContent = entry.category;
      chips.appendChild(categoryChip);
      const difficultyChip = document.createElement('span');
      difficultyChip.className = 'chip';
      difficultyChip.textContent = entry.difficulty;
      chips.appendChild(difficultyChip);
      detail.appendChild(chips);

      const explanation = document.createElement('p');
      explanation.textContent = entry.explanation;
      detail.appendChild(explanation);

      const sources = document.createElement('ul');
      sources.className = 'sources-list';
      for (const source of entry.sources) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = source.url;
        link.textContent = source.name;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        item.appendChild(link);
        sources.appendChild(item);
      }
      detail.appendChild(sources);
      details.appendChild(detail);
      fragment.appendChild(details);
    }
    this.list.appendChild(fragment);
    if (openKey) {
      this.list.querySelector<HTMLElement>('.glossary-entry[open]')?.scrollIntoView({ block: 'start' });
    }
  }
}
