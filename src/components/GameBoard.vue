<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <!-- Заголовок -->
    <div class="text-center mb-8">
      <h1
        class="text-4xl md:text-6xl font-black mb-6"
        style="color: #ffb115; font-family: 'Cera Pro', sans-serif"
      >
        🐚 РАКУШКИ УДАЧИ
      </h1>

      <!-- Счётчик -->
      <div
        class="inline-block px-8 py-4 rounded-2xl"
        style="background: #ffb115; box-shadow: 0 6px 0 #ff8c00"
      >
        <div class="flex items-center gap-3">
          <span class="text-3xl">💰</span>
          <span
            class="text-3xl md:text-4xl font-black text-white"
            style="font-family: 'Cera Pro', sans-serif"
          >
            {{ gameStore.totalCoins }}
          </span>
        </div>
      </div>
    </div>

    <!-- Игровое окно -->
    <div class="w-full max-w-5xl bg-white rounded-3xl p-6 md:p-10 shadow-2xl">
      <!-- Начальный экран -->
      <div v-if="!gameStore.isGameActive && !gameStore.isRoundComplete" class="text-center py-8">
        <p
          class="text-2xl md:text-3xl font-bold mb-8"
          style="color: #1c1751; font-family: 'Cera Pro', sans-serif"
        >
          Готов попытать удачу? 🎰
        </p>
        <button
          @click="handleStart"
          class="px-12 py-4 rounded-full text-white text-xl md:text-2xl font-black transition-transform hover:scale-105 active:scale-95"
          style="
            font-family: 'Cera Pro', sans-serif;
            background: #28d223;
            box-shadow: 0 6px 0 #063f06;
          "
        >
          СТАРТ
        </button>
      </div>

      <!-- Активная игра -->
      <div v-else-if="gameStore.isGameActive" class="text-center">
        <!-- Заголовок -->
        <div class="mb-6">
          <p
            class="text-2xl md:text-3xl font-black mb-4"
            style="color: #ae00ff; font-family: 'Cera Pro', sans-serif"
          >
            ВЫБЕРИ РАКУШКУ
          </p>

          <!-- Таймер -->
          <div
            class="inline-block px-6 py-2 rounded-full"
            style="background: #ff6cf1; box-shadow: 0 4px 0 #ae00ff"
          >
            <p class="text-lg md:text-xl font-black text-white">
              ⏱️ {{ gameStore.roundTimeLeft }} сек
            </p>
          </div>
        </div>

        <!-- Сетка ракушек -->
        <div
          class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto py-6"
        >
          <Shell
            v-for="shell in gameStore.shells"
            :key="shell.id"
            :shell="shell"
            :isSelected="gameStore.selectedShellId === shell.id"
            :isDimmed="gameStore.selectedShellId !== null && gameStore.selectedShellId !== shell.id"
            :canSelect="canSelectShell"
            @select="handleShellSelect"
          />
        </div>
      </div>

      <!-- Экран результатов -->
      <div v-else-if="gameStore.isRoundComplete" class="text-center py-8">
        <!-- Результат -->
        <p
          v-if="gameStore.shells.find((s) => s.id === gameStore.selectedShellId)?.coins ?? 0 > 0"
          class="text-4xl md:text-5xl font-black mb-6"
          style="color: #28d223; font-family: 'Cera Pro', sans-serif"
        >
          🎉 ПОБЕДА!
        </p>
        <p
          v-else
          class="text-4xl md:text-5xl font-black mb-6"
          style="color: #ff6cf1; font-family: 'Cera Pro', sans-serif"
        >
          😢 НЕ ПОВЕЗЛО
        </p>

        <!-- Количество коинов -->
        <div
          class="inline-block px-8 py-4 rounded-2xl mb-8"
          style="background: #ffb115; box-shadow: 0 6px 0 #ff8c00"
        >
          <p
            class="text-2xl md:text-3xl font-black text-white"
            style="font-family: 'Cera Pro', sans-serif"
          >
            +{{ gameStore.shells.find((s) => s.id === gameStore.selectedShellId)?.coins ?? 0 }}
            коинов
          </p>
        </div>

        <button
          @click="handlePlayAgain"
          class="px-12 py-4 rounded-full text-white text-xl md:text-2xl font-black transition-transform hover:scale-105 active:scale-95"
          style="
            font-family: 'Cera Pro', sans-serif;
            background: #ae00ff;
            box-shadow: 0 6px 0 #3c1082;
          "
        >
          ЕЩЁ РАЗ
        </button>
      </div>
    </div>

    <!-- Правила -->
    <div class="mt-8 max-w-2xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-6">
      <h3
        class="text-xl md:text-2xl font-black text-white mb-4 text-center"
        style="font-family: 'Cera Pro', sans-serif"
      >
        📜 ПРАВИЛА
      </h3>
      <div
        class="space-y-2 text-white text-sm md:text-base font-bold text-center"
        style="font-family: 'Cera Pro', sans-serif"
      >
        <p>10 ракушек • 3 по 5 коинов • 2 по 10 коинов</p>
        <p>5 пустых • Шанс 50% • Время 25 сек</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'
import Shell from './ShellComponent.vue'

const gameStore = useGameStore()

const canSelectShell = computed(() => {
  return gameStore.isGameActive && !gameStore.isRoundComplete && gameStore.selectedShellId === null
})

const handleShellSelect = (id: number) => {
  gameStore.selectShell(id)
}

const handleStart = () => {
  gameStore.startGame()
}

const handlePlayAgain = () => {
  gameStore.resetGame()
  gameStore.startGame()
}
</script>
