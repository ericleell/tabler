<template>
  <div class="ext-toolbar" :class="{ 'ext-toolbar-vertical': vertical }">
    <slot>
      <template v-for="(item, idx) in items" :key="idx">
        <div v-if="item.type === 'separator'" class="ext-toolbar-separator"></div>
        <span v-else-if="item.type === 'text'" class="ext-toolbar-text">{{ item.text }}</span>
        <span v-else-if="item.type === 'fill'" style="flex: 1;"></span>
        <button
          v-else
          class="ext-btn"
          :class="{
            'ext-btn-primary': item.btnType === 'primary',
            'ext-btn-danger': item.btnType === 'danger',
            'ext-btn-small': item.small,
          }"
          :disabled="item.disabled"
          @click="$emit('item-click', item)"
        >
          <span v-if="item.icon" v-html="item.icon"></span>
          {{ item.label }}
        </button>
      </template>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  vertical: { type: Boolean, default: false },
})

defineEmits(['item-click'])
</script>
