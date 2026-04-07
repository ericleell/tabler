<template>
  <div class="ext-tab-panel">
    <div class="ext-tab-bar">
      <div
        v-for="(tab, idx) in tabs"
        :key="idx"
        class="ext-tab"
        :class="{ active: activeTab === idx }"
        @click="activeTab = idx"
      >
        <span v-if="tab.icon" v-html="tab.icon" style="margin-right: 4px;"></span>
        {{ tab.title }}
      </div>
    </div>
    <div class="ext-tab-body">
      <slot :name="'tab-' + activeTab"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  tabs: { type: Array, required: true },
  defaultTab: { type: Number, default: 0 },
})

const activeTab = ref(props.defaultTab)
</script>
