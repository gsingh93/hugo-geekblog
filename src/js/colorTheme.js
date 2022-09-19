const Storage = require("store2")

const { TOGGLE_COLOR_THEMES, THEME, COLOR_THEME_AUTO, COLOR_THEME_DARK } = require("./config.js")

export function applyTheme(init = true) {
  if (Storage.isFake()) return

  let lstore = Storage.namespace(THEME)
  let html = document.documentElement
  let currentColorTheme = TOGGLE_COLOR_THEMES.includes(lstore.get("color-theme"))
    ? lstore.get("color-theme")
    : COLOR_THEME_DARK

  html.setAttribute("class", "color-toggle-" + currentColorTheme)
  lstore.set("color-theme", currentColorTheme)

  if (currentColorTheme === COLOR_THEME_AUTO) {
    html.removeAttribute("color-theme")
  } else {
    html.setAttribute("color-theme", currentColorTheme)
  }

  if (!init) {
    // Reload required to re-initialise e.g. Mermaid with the new theme
    // and re-parse the Mermaid code blocks.
    location.reload()
  }
}

function toggle(list = [], value) {
  let current = list.indexOf(value)
  let max = list.length - 1
  let next = 0

  if (current < max) {
    next = current + 1
  }

  return next
}
