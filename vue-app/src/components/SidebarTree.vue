<template>
  <div class="ext-panel ext-mb-0" style="border-radius: 0; height: 100%; display: flex; flex-direction: column; margin-bottom: 0;">
    <div class="ext-panel-header">
      <span class="panel-icon">&#128448;</span>
      <span class="panel-title">Navigation</span>
      <span class="panel-tools">
        <span class="panel-tool" title="Collapse">&#8722;</span>
      </span>
    </div>

    <!-- Search toolbar -->
    <div class="ext-toolbar" style="padding: 4px 6px;">
      <input
        v-model="searchText"
        type="text"
        placeholder="Search..."
        style="flex: 1; padding: 3px 6px; border: 1px solid var(--ext-field-border); font-size: 11px; border-radius: 1px;"
      />
    </div>

    <!-- Tree -->
    <div class="ext-panel-body" style="flex: 1; overflow-y: auto; padding: 0;">
      <div class="ext-tree">
        <TreeNode
          v-for="node in filteredTree"
          :key="node.id"
          :node="node"
          :depth="0"
          :selected-id="selectedId"
          @select="onSelect"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TreeNode from './TreeNode.vue'

const router = useRouter()
const searchText = ref('')
const selectedId = ref('dashboard')

const treeData = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '&#9632;',
    path: '/dashboard',
  },
  {
    id: 'users',
    label: 'User Management',
    icon: '&#128101;',
    expanded: true,
    children: [
      { id: 'users-list', label: 'User List', icon: '&#128196;', path: '/users' },
      { id: 'users-roles', label: 'Roles & Permissions', icon: '&#128274;', path: '/users' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '&#128202;',
    expanded: false,
    children: [
      { id: 'reports-sales', label: 'Sales Report', icon: '&#128200;', path: '/reports' },
      { id: 'reports-traffic', label: 'Traffic Report', icon: '&#128200;', path: '/reports' },
      { id: 'reports-audit', label: 'Audit Log', icon: '&#128196;', path: '/reports' },
    ],
  },
  {
    id: 'settings',
    label: 'System Settings',
    icon: '&#9881;',
    expanded: false,
    children: [
      { id: 'settings-general', label: 'General', icon: '&#128295;', path: '/settings' },
      { id: 'settings-email', label: 'Email Settings', icon: '&#9993;', path: '/settings' },
      { id: 'settings-security', label: 'Security', icon: '&#128274;', path: '/settings' },
    ],
  },
]

function filterTree(nodes, text) {
  if (!text) return nodes
  const lower = text.toLowerCase()
  return nodes
    .map((node) => {
      if (node.children) {
        const filteredChildren = filterTree(node.children, text)
        if (filteredChildren.length > 0) {
          return { ...node, children: filteredChildren, expanded: true }
        }
      }
      if (node.label.toLowerCase().includes(lower)) {
        return { ...node }
      }
      return null
    })
    .filter(Boolean)
}

const filteredTree = computed(() => filterTree(treeData, searchText.value))

function onSelect(node) {
  selectedId.value = node.id
  if (node.path) {
    router.push(node.path)
  }
}
</script>
