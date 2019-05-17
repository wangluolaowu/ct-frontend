import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './langs'
import locale from 'element-ui/lib/locale'

Vue.use(VueI18n)
const init = Vue.prototype._init
Vue.prototype._init = function(options) {
  init.call(this, {
    i18n,
    ...options
  })
}

// 从localStorage中拿到用户的语言选择，如果没有，那默认中文。
const DEFAULT_LANG = 'en'
const LOCALE_KEY = 'lang'

const i18n = new VueI18n({
  locale: DEFAULT_LANG || 'en',
  messages
})

export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (!lang) {
      lang = DEFAULT_LANG
    }
  }
  window.localStorage.setItem(LOCALE_KEY, lang)
  Vue.config.lang = lang
  i18n.locale = lang
}

setup()

locale.i18n((key, value) => i18n.t(key, value)) // 兼容element
setup()
window.i18n = i18n

export default i18n
