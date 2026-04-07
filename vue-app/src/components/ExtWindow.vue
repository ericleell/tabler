<template>
  <Teleport to="body">
    <div v-if="visible" class="ext-window-mask" @click.self="$emit('close')">
      <div class="ext-window" :style="{ width: width }">
        <div class="ext-panel-header">
          <span v-if="icon" class="panel-icon" v-html="icon"></span>
          <span class="panel-title">{{ title }}</span>
          <span class="panel-tools">
            <span class="panel-tool" title="Close" @click="$emit('close')">&#10005;</span>
          </span>
        </div>
        <div class="ext-panel-body">
          <slot></slot>
        </div>
        <div class="ext-window-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: 'Window' },
  icon: { type: String, default: '' },
  width: { type: String, default: '500px' },
})

defineEmits(['close'])
</script>
