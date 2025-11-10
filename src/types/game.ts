export interface Shell {
  id: number
  isOpen: boolean
  coins: number
}

export interface GameState {
  shells: Shell[]
  selectedShellId: number | null
  totalCoins: number
  isGameActive: boolean
  isRoundComplete: boolean
  // roundTimeLeft: number;
}

export type PrizeDistribution = 5 | 10 | 0
