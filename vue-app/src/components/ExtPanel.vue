<template>
  <div class="ext-panel">
    <div class="ext-panel-header" v-if="title">
      <span v-if="icon" class="panel-icon" v-html="icon"></span>
      <span class="panel-title">{{ title }}</span>
      <span class="panel-tools">
        <slot name="tools">
          <span
            v-if="collapsible"
            class="panel-tool"
            :title="collapsed ? 'Expand' : 'Collapse'"
            @click="collapsed = !collapsed"
          >
            {{ collapsed ? '+' : '−' }}
          </span>
        </slot>
      </span>
    </div>

    <!-- Toolbar slot -->
    <slot name="toolbar"></slot>

    <!-- Body -->
    <div v-show="!collapsed" class="ext-panel-body" :class="{ 'no-padding': noPadding }">
      <slot></slot>
    </div>

    <!-- Footer / Bottom bar -->
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  collapsible: { type: Boolean, default: false },
  noPadding: { type: Boolean, default: false },
})

const collapsed = ref(false)
</script>
