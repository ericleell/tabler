<template>
  <nav class="ext-breadcrumb">
    <span
      v-for="(item, idx) in items"
      :key="idx"
      class="ext-breadcrumb-item"
      :class="{ active: idx === items.length - 1 }"
    >
      <a
        v-if="idx < items.length - 1"
        href="#"
        @click.prevent="$emit('navigate', item)"
      >
        <span v-if="item.icon" v-html="item.icon" style="margin-right: 3px;"></span>
        {{ item.label }}
      </a>
      <span v-else>
        <span v-if="item.icon" v-html="item.icon" style="margin-right: 3px;"></span>
        {{ item.label }}
      </span>
      <span v-if="idx < items.length - 1" class="ext-breadcrumb-separator">{{ separator }}</span>
    </span>
  </nav>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
  separator: { type: String, default: '›' },
})

defineEmits(['navigate'])
</script>
