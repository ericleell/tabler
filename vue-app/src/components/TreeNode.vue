<template>
  <div>
    <div
      class="ext-tree-node-content"
      :class="{ selected: selectedId === node.id }"
      :style="{ paddingLeft: depth * 18 + 4 + 'px' }"
      @click="onClick"
    >
      <!-- Expander -->
      <span
        class="ext-tree-expander"
        @click.stop="toggleExpand"
      >
        <template v-if="hasChildren">
          <span v-if="expanded">&#9662;</span>
          <span v-else>&#9656;</span>
        </template>
      </span>

      <!-- Icon -->
      <span class="ext-tree-icon" v-html="node.icon || '&#128196;'"></span>

      <!-- Label -->
      <span class="ext-tree-label">{{ node.label }}</span>
    </div>

    <!-- Children -->
    <div v-if="hasChildren && expanded" class="ext-tree-children" style="padding-left: 0;">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
        :selected-id="selectedId"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  node: { type: Object, required: true },
  depth: { type: Number, default: 0 },
  selectedId: { type: String, default: '' },
})

const emit = defineEmits(['select'])

const expanded = ref(props.node.expanded ?? false)

const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0
})

function toggleExpand() {
  if (hasChildren.value) {
    expanded.value = !expanded.value
  }
}

function onClick() {
  emit('select', props.node)
  if (hasChildren.value) {
    expanded.value = !expanded.value
  }
}
</script>
