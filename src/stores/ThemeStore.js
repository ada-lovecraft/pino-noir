import themes from '../themes/base16-themes.js'
import createLogger from '../logger.js'
import { getBase16ColorName } from '../libs/base16.js'
const console = createLogger('ThemeStore')

class ThemeStore {
  static instance = null
  palette = null
  static getInstance() {
    if (!ThemeStore.instance) {
      ThemeStore.instance = new ThemeStore()
    }
    return ThemeStore.instance
  }

  constructor() {
    console.info({ style: this.style }, 'theme-store-init')
    ThemeStore.instance = this
    this.setTheme('rose-pine-moon')
  }
  style = style => {
    const color = getBase16ColorName(style)
    return this.palette[color] || 'red'
  }
  setTheme(themeName) {
    const theme = themes.find(t => [t.name, t.slug].includes(themeName))
    if (!theme) {
      console.warn({ themeName }, 'theme-not-found')
    }
    this.palette = theme.colors
  }
}

export default ThemeStore.getInstance()
