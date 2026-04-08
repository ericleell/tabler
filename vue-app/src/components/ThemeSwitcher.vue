<template>
  <div class="ext-theme-switcher">
    <span class="ext-toolbar-text">Theme:</span>
    <div
      v-for="theme in themes"
      :key="theme.id"
      class="ext-theme-swatch"
      :class="{ active: current === theme.id }"
      :title="theme.name + ' — ' + theme.description"
      @click="setTheme(theme.id)"
    >
      <span class="swatch-color" :class="'swatch-' + theme.id"></span>
      <span class="swatch-label">{{ theme.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { themeStore } from '@/store/theme.js'

const themes = themeStore.availableThemes
const current = computed(() => themeStore.state.current)

function setTheme(id) {
  themeStore.setTheme(id)
}
</script>
