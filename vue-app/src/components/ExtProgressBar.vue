<template>
  <div class="ext-progress" :class="{ 'ext-progress-with-text': showText }">
    <div
      class="ext-progress-bar"
      :style="{ width: clampedValue + '%' }"
    >
      <span v-if="showText && textInside" class="ext-progress-text">{{ displayText }}</span>
    </div>
    <span v-if="showText && !textInside" class="ext-progress-label">{{ displayText }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  showText: { type: Boolean, default: true },
  textInside: { type: Boolean, default: true },
  format: { type: Function, default: null },
})

const clampedValue = computed(() => {
  return Math.max(0, Math.min(100, props.value))
})

const displayText = computed(() => {
  if (props.format) return props.format(clampedValue.value)
  return `${clampedValue.value}%`
})
</script>
