<template>
  <div class="ext-split-button" :class="{ open: isOpen }" ref="wrapRef">
    <button
      class="ext-btn ext-split-button-main"
      :class="{
        'ext-btn-primary': btnType === 'primary',
        'ext-btn-danger': btnType === 'danger',
      }"
      @click="$emit('click')"
    >
      <span v-if="icon" v-html="icon"></span>
      {{ label }}
    </button>
    <button
      class="ext-btn ext-split-button-arrow"
      :class="{
        'ext-btn-primary': btnType === 'primary',
        'ext-btn-danger': btnType === 'danger',
      }"
      @click.stop="toggle"
    >
      &#9662;
    </button>

    <div v-if="isOpen" class="ext-split-menu">
      <template v-for="(item, idx) in menuItems" :key="idx">
        <div v-if="item.separator" class="ext-split-menu-separator"></div>
        <div
          v-else
          class="ext-split-menu-item"
          :class="{ disabled: item.disabled }"
          @click="onMenuClick(item)"
        >
          <span v-if="item.icon" v-html="item.icon" style="margin-right: 6px;"></span>
          {{ item.label }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  icon: { type: String, default: '' },
  btnType: { type: String, default: '' },
  menuItems: { type: Array, default: () => [] },
})

const emit = defineEmits(['click', 'menu-click'])

const isOpen = ref(false)
const wrapRef = ref(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function onMenuClick(item) {
  if (item.disabled) return
  emit('menu-click', item)
  isOpen.value = false
}

function onClickOutside(e) {
  if (wrapRef.value && !wrapRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside)
})
</script>
