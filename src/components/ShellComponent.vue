<template>
  <div :class="shellClasses" @click="handleClick">
    <!-- Закрытая ракушка -->
    <div
      v-if="!shell.isOpen"
      class="w-full h-full rounded-full flex items-center justify-center"
      style="background: #ff8c42; box-shadow: 0 4px 0 #d4522a"
    >
      <div class="text-3xl sm:text-4xl md:text-5xl">🐚</div>
    </div>

    <!-- Открытая ракушка -->
    <div
      v-else
      class="w-full h-full rounded-full flex items-center justify-center animate-shell-open"
      :style="{
        background: shell.coins > 0 ? '#ffb115' : '#757575',
        boxShadow: shell.coins > 0 ? '0 4px 0 #ff8c00' : '0 4px 0 #424242',
      }"
    >
      <!-- Выигрыш -->
      <div v-if="shell.coins > 0" class="flex flex-col items-center">
        <div class="text-2xl sm:text-3xl md:text-4xl">💰</div>
        <div
          class="text-xs sm:text-sm md:text-base font-black text-white px-2 py-0.5 rounded-full mt-1"
          style="background: #28d223"
        >
          +{{ shell.coins }}
        </div>
      </div>
      <!-- Проигрыш -->
      <div v-else class="text-2xl sm:text-3xl md:text-4xl opacity-60">❌</div>
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
