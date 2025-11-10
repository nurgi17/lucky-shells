<template>
  <div :class="shellClasses" @click="handleClick">
    <!-- Закрытая ракушка -->
    <div
      v-if="!shell.isOpen"
      class="w-[241px] h-[241px] rounded-[30px] flex items-center justify-center border-7 border-solid border-[#AE00FF] shrink-0"
      :class="{ 'border-[#e9b5f1] shadow-[0_0_20px_5px_rgba(192,132,252,0.8)]': isSelected }"
    >
      <img src="../assets/images/busters/13-min.png" alt="" class="w-[200px] h-[200px]" />
    </div>

    <!-- Открытая ракушка -->
    <div
      v-else
      class="w-[241px] h-[241px] rounded-[30px] flex items-center justify-center animate-shell-open border-7 border-solid border-[#e9b5f1] shadow-[0_0_20px_5px_rgba(192,132,252,0.8)] shrink-0"
    >
      <!-- Выигрыш -->
      <div v-if="shell.coins > 0" class="flex flex-col items-center">
        <div class="text-[120px] font-black text-white">+{{ shell.coins }}</div>
      </div>
      <!-- Проигрыш -->
      <div v-else class="text-[150px] opacity-60">❌</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Shell } from '../types/game'

const props = defineProps<{
  shell: Shell
  isSelected: boolean
  isDimmed: boolean
  canSelect: boolean
}>()

const emit = defineEmits<{
  select: [id: number]
}>()

const handleClick = () => {
  if (props.canSelect && !props.isSelected) {
    emit('select', props.shell.id)
  }
}

const shellClasses = computed(() => {
  return [
    'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200',
    {
      'opacity-30': props.isDimmed,
      'scale-105': props.isSelected && !props.shell.isOpen,
      'hover:scale-110': props.canSelect && !props.isSelected,
    },
  ]
})
</script>
