<template>
  <div class="ext-form-field ext-combobox" :class="{ 'has-error': error, open: isOpen }">
    <label v-if="label">{{ label }}</label>
    <div class="field-body">
      <div class="ext-combobox-wrap" ref="wrapRef">
        <input
          type="text"
          :value="displayValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="!searchable"
          @input="onInput"
          @focus="onFocus"
          @keydown.down.prevent="moveHighlight(1)"
          @keydown.up.prevent="moveHighlight(-1)"
          @keydown.enter.prevent="selectHighlighted"
          @keydown.escape="close"
          ref="inputRef"
        />
        <span class="ext-combobox-trigger" @click="toggle">&#9662;</span>

        <div v-if="isOpen" class="ext-combobox-list">
          <div
            v-for="(opt, idx) in filteredOptions"
            :key="opt.value"
            class="ext-combobox-item"
            :class="{
              selected: opt.value === modelValue,
              highlighted: idx === highlightIndex,
            }"
            @mousedown.prevent="select(opt)"
            @mouseenter="highlightIndex = idx"
          >
            {{ opt.label }}
          </div>
          <div v-if="filteredOptions.length === 0" class="ext-combobox-empty">
            No matches found
          </div>
        </div>
      </div>
      <div v-if="error" class="field-error">{{ error }}</div>
      <div v-else-if="help" class="field-help">{{ help }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  label: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Select...' },
  disabled: { type: Boolean, default: false },
  searchable: { type: Boolean, default: true },
  error: { type: String, default: '' },
  help: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const searchText = ref('')
const highlightIndex = ref(-1)
const wrapRef = ref(null)
const inputRef = ref(null)

const displayValue = computed(() => {
  if (isOpen.value && props.searchable) return searchText.value
  const found = props.options.find((o) => o.value === props.modelValue)
  return found ? found.label : ''
})

const filteredOptions = computed(() => {
  if (!searchText.value || !props.searchable) return props.options
  const lower = searchText.value.toLowerCase()
  return props.options.filter((o) => o.label.toLowerCase().includes(lower))
})

function onInput(e) {
  searchText.value = e.target.value
  isOpen.value = true
  highlightIndex.value = 0
}

function onFocus() {
  isOpen.value = true
  searchText.value = ''
  highlightIndex.value = -1
}

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchText.value = ''
    inputRef.value?.focus()
  }
}

function close() {
  isOpen.value = false
}

function select(opt) {
  emit('update:modelValue', opt.value)
  isOpen.value = false
  searchText.value = ''
}

function moveHighlight(dir) {
  if (!isOpen.value) {
    isOpen.value = true
    return
  }
  const len = filteredOptions.value.length
  if (len === 0) return
  highlightIndex.value = (highlightIndex.value + dir + len) % len
}

function selectHighlighted() {
  if (highlightIndex.value >= 0 && highlightIndex.value < filteredOptions.value.length) {
    select(filteredOptions.value[highlightIndex.value])
  }
}

function onClickOutside(e) {
  if (wrapRef.value && !wrapRef.value.contains(e.target)) {
    close()
  }
}

watch(
  () => props.modelValue,
  () => {
    searchText.value = ''
  },
)

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', onClickOutside)
})
</script>
