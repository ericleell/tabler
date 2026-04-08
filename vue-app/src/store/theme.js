import { reactive, watch } from 'vue'

const STORAGE_KEY = 'tabler-vue-theme'

const availableThemes = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional ExtJS classic blue style with gradients',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    description: 'Modern flat design with teal accents',
  },
  {
    id: 'triton',
    name: 'Triton',
    description: 'Clean material-inspired light theme',
  },
  {
    id: 'aria',
    name: 'Aria (Dark)',
    description: 'Dark theme with high contrast',
  },
]

function loadSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'classic'
  } catch {
    return 'classic'
  }
}

const state = reactive({
  current: loadSavedTheme(),
  themes: availableThemes,
})

function setTheme(themeId) {
  const valid = availableThemes.find((t) => t.id === themeId)
  if (valid) {
    state.current = themeId
  }
}

function applyTheme(themeId) {
  document.documentElement.setAttribute('data-theme', themeId)
  try {
    localStorage.setItem(STORAGE_KEY, themeId)
  } catch {
    /* storage unavailable */
  }
}

watch(
  () => state.current,
  (newTheme) => {
    applyTheme(newTheme)
  },
  { immediate: true },
)

export const themeStore = {
  state,
  setTheme,
  availableThemes,
}
