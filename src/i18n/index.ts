import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'ru',
  messages: {
    ru: {
      lucky: 'LUCKY',
      shells: 'SHELLS',
      startGame: 'начать игру',
      tryAgain: 'попробуй ещё',
      congrats: 'поздравляем!',
      newGame: 'новая игра',
      ok: 'ок',
      choose: 'Выбери свою',
      shell: 'ракушку удачи!',
    },
    en: {
      lucky: 'LUCKY',
      shells: 'SHELLS',
      startGame: 'start game',
      tryAgain: 'try again',
      congrats: 'congratulations!',
      newGame: 'new game',
      ok: 'ok',
      choose: 'Choose your',
      shell: 'lucky shell!',
    },
  },
})

export default i18n
