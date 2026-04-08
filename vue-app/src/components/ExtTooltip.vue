<template>
  <span
    class="ext-tooltip-trigger"
    @mouseenter="show"
    @mouseleave="hide"
    @focus="show"
    @blur="hide"
    ref="triggerRef"
  >
    <slot></slot>
    <Teleport to="body">
      <div
        v-if="visible"
        class="ext-tooltip"
        :class="'ext-tooltip-' + placement"
        :style="tooltipStyle"
        ref="tooltipRef"
      >
        <div class="ext-tooltip-content">{{ text }}</div>
        <div class="ext-tooltip-arrow"></div>
      </div>
    </Teleport>
  </span>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  placement: {
    type: String,
    default: 'top',
    validator: (v) => ['top', 'bottom', 'left', 'right'].includes(v),
  },
  delay: { type: Number, default: 200 },
})

const visible = ref(false)
const tooltipStyle = ref({})
const triggerRef = ref(null)
const tooltipRef = ref(null)
let showTimeout = null

function show() {
  showTimeout = setTimeout(async () => {
    visible.value = true
    await nextTick()
    positionTooltip()
  }, props.delay)
}

function hide() {
  clearTimeout(showTimeout)
  visible.value = false
}

function positionTooltip() {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerEl = triggerRef.value
  const rect = triggerEl.getBoundingClientRect()
  const tipEl = tooltipRef.value
  const tipRect = tipEl.getBoundingClientRect()

  let top, left

  switch (props.placement) {
    case 'top':
      top = rect.top - tipRect.height - 8
      left = rect.left + rect.width / 2 - tipRect.width / 2
      break
    case 'bottom':
      top = rect.bottom + 8
      left = rect.left + rect.width / 2 - tipRect.width / 2
      break
    case 'left':
      top = rect.top + rect.height / 2 - tipRect.height / 2
      left = rect.left - tipRect.width - 8
      break
    case 'right':
      top = rect.top + rect.height / 2 - tipRect.height / 2
      left = rect.right + 8
      break
  }

  tooltipStyle.value = {
    position: 'fixed',
    top: top + 'px',
    left: left + 'px',
    zIndex: 99999,
  }
}
</script>
