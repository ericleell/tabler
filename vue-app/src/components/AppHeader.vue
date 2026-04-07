<template>
  <div class="ext-toolbar" style="border-bottom: 1px solid var(--ext-primary-dark);">
    <!-- App Logo / Brand -->
    <div style="display: flex; align-items: center; gap: 6px; padding: 0 8px;">
      <span style="font-size: 16px; color: var(--ext-primary);">&#9783;</span>
      <strong style="font-size: 14px; color: var(--ext-primary-dark);">Tabler Vue App</strong>
    </div>

    <div class="ext-toolbar-separator"></div>

    <!-- Menu Buttons -->
    <button
      v-for="item in menuItems"
      :key="item.path"
      class="ext-btn"
      :class="{ 'ext-btn-primary': isActive(item.path) }"
      @click="navigate(item.path)"
    >
      <span v-html="item.icon"></span>
      {{ item.label }}
    </button>

    <div style="flex: 1;"></div>

    <!-- Right-side tools -->
    <span class="ext-toolbar-text">Admin</span>
    <button class="ext-btn ext-btn-small">&#9881; Settings</button>
    <button class="ext-btn ext-btn-small">&#8635; Refresh</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '&#9632;' },
  { label: 'Users', path: '/users', icon: '&#9783;' },
  { label: 'Reports', path: '/reports', icon: '&#9776;' },
  { label: 'Settings', path: '/settings', icon: '&#9881;' },
]

function isActive(path) {
  return route.path === path
}

function navigate(path) {
  router.push(path)
}
</script>
