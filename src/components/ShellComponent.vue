<template>
  <div :class="shellClasses" @click="handleClick">
    <!-- Закрытая ракушка -->
    <div
      v-if="!shell.isOpen"
      class="w-[241px] h-[241px] rounded-[30px] flex items-center justify-center border-7 border-solid border-[#AE00FF] shrink-0 transition-all duration-300"
      :class="{
        'border-[#e9b5f1] animate-glow-pulse': isSelected,
        'animate-shell-idle': canSelect && !isSelected,
      }"
    >
      <img
        src="../assets/images/busters/shell-2-min.png"
        alt=""
        class="w-[170px] h-[170px] transition-transform duration-200"
      />
    </div>

    <!-- Открытая ракушка -->
    <div
      v-else
      class="w-[241px] h-[241px] rounded-[30px] flex items-center justify-center animate-shell-open border-7 border-solid shrink-0 relative"
      :class="{
        'border-[#e9b5f1] shadow-[0_0_20px_5px_rgba(192,132,252,0.8)]': shell.coins > 0,
        'border-[#AE00FF]': shell.coins === 0,
      }"
      @animationend="onShellAnimationEnd"
    >
      <!-- Выигрыш -->
      <div v-if="shell.coins > 0" class="flex flex-col items-center relative">
        <img src="../assets/images/busters/shell-1-min.png" alt="" class="w-[170px] h-[170px]" />

        <!-- Показываем цифру только после окончания анимации -->
        <transition name="coins-pop">
          <div
            v-if="showCoins"
            class="absolute inset-0 flex items-center justify-center text-[60px] font-black text-white"
          >
            +{{ shell.coins }}
          </div>
        </transition>
      </div>

      <!-- Проигрыш -->
      <div v-else class="text-[150px] opacity-60 animate-shell-lose">❌</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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

const showCoins = ref(false)

const handleClick = () => {
  if (props.canSelect && !props.isSelected) {
    emit('select', props.shell.id)
  }
}

// Срабатывает когда заканчивается анимация открытия (вращение)
const onShellAnimationEnd = () => {
  if (props.shell.coins > 0) {
    showCoins.value = true
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

<style lang="css" scoped>
/* Плавное появление и увеличение +{{ shell.coins }} */
.coins-pop-enter-active {
  animation: coins-pop 0.5s ease-out forwards;
}

@keyframes coins-pop {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  70% {
    opacity: 1;
    transform: scale(2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
