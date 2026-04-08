<template>
  <Teleport to="body">
    <div v-if="visible" class="ext-window-mask ext-messagebox-mask" @click.self="onMaskClick">
      <div class="ext-window ext-messagebox" :style="{ width: width }">
        <div class="ext-panel-header">
          <span class="panel-title">{{ title }}</span>
          <span class="panel-tools">
            <span class="panel-tool" title="Close" @click="doCancel">&#10005;</span>
          </span>
        </div>
        <div class="ext-panel-body ext-messagebox-body">
          <div class="ext-messagebox-icon" :class="'icon-' + type" v-html="iconMap[type]"></div>
          <div class="ext-messagebox-content">
            <p v-if="message">{{ message }}</p>
            <div v-if="type === 'prompt'" class="ext-messagebox-input">
              <input
                ref="promptInput"
                v-model="promptValue"
                type="text"
                :placeholder="inputPlaceholder"
                @keydown.enter="doConfirm"
              />
            </div>
          </div>
        </div>
        <div class="ext-window-footer">
          <button v-if="showCancel" class="ext-btn" @click="doCancel">{{ cancelText }}</button>
          <button class="ext-btn ext-btn-primary" @click="doConfirm">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: 'Message' },
  message: { type: String, default: '' },
  type: {
    type: String,
    default: 'info',
    validator: (v) => ['info', 'warning', 'error', 'question', 'prompt'].includes(v),
  },
  confirmText: { type: String, default: 'OK' },
  cancelText: { type: String, default: 'Cancel' },
  width: { type: String, default: '400px' },
  inputPlaceholder: { type: String, default: '' },
  inputValue: { type: String, default: '' },
  closable: { type: Boolean, default: true },
})

const emit = defineEmits(['confirm', 'cancel', 'update:visible'])

const promptValue = ref(props.inputValue)
const promptInput = ref(null)

const showCancel = computed(() => {
  return props.type === 'question' || props.type === 'prompt'
})

const iconMap = {
  info: '<span style="color: var(--ext-messagebox-icon-info); font-size: 32px;">&#9432;</span>',
  warning:
    '<span style="color: var(--ext-messagebox-icon-warning); font-size: 32px;">&#9888;</span>',
  error: '<span style="color: var(--ext-messagebox-icon-error); font-size: 32px;">&#10060;</span>',
  question:
    '<span style="color: var(--ext-messagebox-icon-question); font-size: 32px;">&#10067;</span>',
  prompt:
    '<span style="color: var(--ext-messagebox-icon-info); font-size: 32px;">&#9998;</span>',
}

watch(
  () => props.visible,
  (val) => {
    if (val && props.type === 'prompt') {
      promptValue.value = props.inputValue
      nextTick(() => promptInput.value?.focus())
    }
  },
)

function doConfirm() {
  emit('confirm', props.type === 'prompt' ? promptValue.value : true)
  emit('update:visible', false)
}

function doCancel() {
  emit('cancel')
  emit('update:visible', false)
}

function onMaskClick() {
  if (props.closable) {
    doCancel()
  }
}
</script>
