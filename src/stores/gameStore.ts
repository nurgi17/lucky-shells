import { defineStore } from 'pinia'
import type { GameState } from '../types/game'

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    shells: [],
    selectedShellId: null,
    totalCoins: 0,
    isGameActive: false,
    isRoundComplete: false,
    roundTimeLeft: 0,
  }),

  actions: {
    // Инициализация новой игры
    startGame() {
      this.isGameActive = true
      this.isRoundComplete = false
      this.selectedShellId = null
      this.roundTimeLeft = 25

      // Генерируем распределение призов
      const prizes = this.generatePrizes()

      // Создаём 10 ракушек
      this.shells = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        isOpen: false,
        coins: prizes[i]!,
      }))

      // Запускаем таймер раунда
      this.startTimer()
    },

    // Генерация призов: 3 ракушки по 5 коинов, 2 ракушки по 10 коинов, 5 ракушек по 0 коинов
    generatePrizes(): number[] {
      const prizes = new Array(10).fill(0)

      // Получаем 5 случайных индексов для призовых ракушек
      const prizeIndices = this.getRandomIndices(10, 5)

      // Первые 3 индекса получают по 5 коинов
      for (let i = 0; i < 3; i++) {
        prizes[prizeIndices[i]!] = 5
      }

      // Следующие 2 индекса получают по 10 коинов
      for (let i = 3; i < 5; i++) {
        prizes[prizeIndices[i]!] = 10
      }

      return prizes
    },

    // Получить случайные уникальные индексы
    getRandomIndices(max: number, count: number): number[] {
      const indices: number[] = []
      while (indices.length < count) {
        const rand = Math.floor(Math.random() * max)
        if (!indices.includes(rand)) {
          indices.push(rand)
        }
      }
      return indices
    },

    // Выбор ракушки
    selectShell(id: number) {
      if (!this.isGameActive || this.selectedShellId !== null || this.isRoundComplete) {
        return
      }

      this.selectedShellId = id

      // Открываем выбранную ракушку
      setTimeout(() => {
        const selectedShell = this.shells.find(shell => shell.id === id)
        if (selectedShell) {
          selectedShell.isOpen = true

          // Добавляем коины
          if (selectedShell.coins > 0) {
            setTimeout(() => {
              this.totalCoins += selectedShell.coins
            }, 300)
          }

          // Завершаем раунд
          setTimeout(() => {
            this.completeRound()
          }, 2000)
        }
      }, 500)
    },

    // Завершение раунда
    completeRound() {
      this.isRoundComplete = true
      this.isGameActive = false
    },

    // Сброс игры
    resetGame() {
      this.shells = []
      this.selectedShellId = null
      this.isGameActive = false
      this.isRoundComplete = false
      this.roundTimeLeft = 0
    },

    // Таймер раунда
    startTimer() {
      const interval = setInterval(() => {
        if (this.roundTimeLeft > 0 && this.isGameActive && !this.isRoundComplete) {
          this.roundTimeLeft--
        } else {
          clearInterval(interval)
        }
      }, 1000)
    }
  },
})
