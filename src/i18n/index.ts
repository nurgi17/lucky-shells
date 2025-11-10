import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
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
      startGame: 'начать игру',
      tryAgain: 'try again',
      congrats: 'congratulations!',
      newGame: 'new game',
      ok: 'ok',
      choose: 'Выбери свою',
      shell: 'ракушку удачи!',
    },
  },
})

export default i18n
