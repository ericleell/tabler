<template>
  <div class="ext-statusbar">
    <span class="status-icon" style="color: green;">&#9679;</span>
    <span class="status-text">Ready</span>
    <span class="ext-toolbar-separator" style="height: 14px;"></span>
    <span>{{ currentTime }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
let timer = null

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleString()
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
