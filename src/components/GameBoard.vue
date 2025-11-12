<template>
  <div
    class="w-[1080px] h-[1920px] max-w-[1080px] max-h-[1920px]"
    :class="{
      'start-back': !gameStore.isGameActive && !gameStore.isRoundComplete,
      'main-back': gameStore.isGameActive,
      'result-back': gameStore.isRoundComplete,
    }"
  >
    <!-- Start Screen -->
    <div
      v-if="!gameStore.isGameActive && !gameStore.isRoundComplete"
      class="flex flex-col justify-center items-center text-center"
    >
      <div class="flex flex-col justify-center items-center mt-[741px]!">
        <img src="../assets/images/logo.svg" alt="logo" class="mb-14!" />
        <h1 class="font-bold text-[150px] text-white leading-40">{{ $t('lucky') }}</h1>
        <h1 class="font-bold text-[150px] text-white leading-40 second-font">
          <i>{{ $t('shells') }}</i>
        </h1>
      </div>
      <button
        @click="handleStart"
        @touchstart.prevent="handleStart"
        class="cursor-pointer touch-manipulation relative z-10 uppercase text-[96px] text-white font-bold pb-5! px-33.5! rounded-[10000px] bg-linear-to-tr from-[#3C1082] to-[#AE00FF] border-10 border-solid border-[#AE00FF] mt-[346px]!"
      >
        {{ $t('startGame') }}
      </button>
    </div>

    <div
      v-if="gameStore.isGameActive"
      class="flex flex-col justify-center items-center text-center pt-[167px]"
    >
      <img src="../assets/images/logo.svg" alt="logo" class="mb-19!" />
      <h1 class="font-bold text-[96px] text-white leading-25">{{ $t('choose') }}</h1>
      <h1 class="font-bold text-[96px] text-white leading-25 second-font">
        <i>{{ $t('shell') }}</i>
      </h1>
      <div class="grid grid-cols-3 gap-[170px] mt-[220px]! px-20">
        <Shell
          v-for="(shell, idx) in gameStore.shells"
          :key="shell.id"
          :shell="shell"
          :isSelected="gameStore.selectedShellId === shell.id"
          :isDimmed="gameStore.selectedShellId !== null && gameStore.selectedShellId !== shell.id"
          :canSelect="canSelectShell"
          :class="{ 'col-span-1 col-start-2': idx === 9 }"
          @select="handleShellSelect"
        />
      </div>
    </div>

    <!-- Экран результатов -->
    <div v-if="gameStore.isRoundComplete">
      <ResultScreen :result="result" @playAgain="handlePlayAgain" @goToStart="handleGoToStart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'
import ResultScreen from './ResultScreen.vue'
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
const handleGoToStart = () => {
  gameStore.resetGame()
}

const result = computed(() => {
  return gameStore.shells.find((s) => s.id === gameStore.selectedShellId)?.coins ?? 0
})
</script>

<style scoped>
.second-font i {
  font-family: 'Calvino', sans-serif !important;
}
.start-back {
  background-image: url('../assets/images/start-back-min.png');
}
.main-back {
  background-image: url('../assets/images/main-back-min.png');
}
.result-back {
  background-image: url('../assets/images/result-back-min.png');
}
</style>
