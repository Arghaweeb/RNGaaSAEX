// Store recent beacon rounds

import type { RoundInfo } from './types';

class RoundStore {
  private rounds: RoundInfo[] = [];
  private currentRoundId = 0;

  add(round: RoundInfo) {
    this.rounds.push(round);
    if (this.rounds.length > 100) this.rounds.shift(); // keep last 100
  }

  getRecent(limit = 10): RoundInfo[] {
    return this.rounds.slice(-limit);
  }

  getCurrentRoundId(): number {
    return this.currentRoundId;
  }

  incrementRound(): number {
    return ++this.currentRoundId;
  }
}

export const roundStore = new RoundStore();
