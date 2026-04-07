<template>
  <div>
    <ExtGrid
      title="User Management"
      icon="&#128101;"
      :columns="columns"
      :data="users"
      :pageable="true"
      :page-size="8"
      :checkbox-selection="true"
      :row-numbers="true"
      @row-click="onRowClick"
      @selection-change="onSelectionChange"
      @refresh="loadUsers"
    >
      <template #toolbar>
        <div class="ext-toolbar">
          <button class="ext-btn ext-btn-primary" @click="showAddDialog = true">&#10010; Add User</button>
          <button class="ext-btn" :disabled="selectedIds.length === 0" @click="editSelected">&#9998; Edit</button>
          <button class="ext-btn ext-btn-danger" :disabled="selectedIds.length === 0" @click="deleteSelected">&#128465; Delete</button>
          <div class="ext-toolbar-separator"></div>
          <button class="ext-btn" @click="loadUsers">&#8635; Refresh</button>
          <div style="flex: 1;"></div>
          <span class="ext-toolbar-text">Search:</span>
          <input
            v-model="searchText"
            type="text"
            placeholder="Filter users..."
            style="padding: 3px 6px; border: 1px solid var(--ext-field-border); font-size: 11px; width: 160px; border-radius: 1px;"
          />
        </div>
      </template>

      <!-- Custom status cell -->
      <template #cell-status="{ value }">
        <span class="badge" :class="value === 'Active' ? 'bg-success' : 'bg-secondary'">{{ value }}</span>
      </template>
    </ExtGrid>

    <!-- Add/Edit User Window -->
    <ExtWindow
      :visible="showAddDialog"
      title="Add New User"
      icon="&#128100;"
      width="450px"
      @close="showAddDialog = false"
    >
      <div class="ext-form-field">
        <label>Name:</label>
        <div class="field-body">
          <input v-model="newUser.name" type="text" placeholder="Full name" />
        </div>
      </div>
      <div class="ext-form-field">
        <label>Email:</label>
        <div class="field-body">
          <input v-model="newUser.email" type="email" placeholder="Email address" />
        </div>
      </div>
      <div class="ext-form-field">
        <label>Role:</label>
        <div class="field-body">
          <select v-model="newUser.role">
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
      </div>
      <div class="ext-form-field">
        <label>Department:</label>
        <div class="field-body">
          <select v-model="newUser.department">
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>

      <template #footer>
        <button class="ext-btn ext-btn-primary" @click="addUser">&#10003; Save</button>
        <button class="ext-btn" @click="showAddDialog = false">&#10005; Cancel</button>
      </template>
    </ExtWindow>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ExtGrid from '@/components/ExtGrid.vue'
import ExtWindow from '@/components/ExtWindow.vue'

const searchText = ref('')
const showAddDialog = ref(false)
const selectedIds = ref([])

const newUser = ref({
  name: '',
  email: '',
  role: 'Viewer',
  department: 'Engineering',
})

const columns = [
  { field: 'name', header: 'Name', sortable: true },
  { field: 'email', header: 'Email', sortable: true },
  { field: 'role', header: 'Role', width: '100px', sortable: true },
  { field: 'department', header: 'Department', width: '120px', sortable: true },
  { field: 'status', header: 'Status', width: '90px', sortable: true },
  { field: 'lastLogin', header: 'Last Login', width: '140px', sortable: true },
]

const allUsers = ref([
  { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', department: 'Engineering', status: 'Active', lastLogin: '2026-04-07 10:30' },
  { id: 2, name: 'Emily Chen', email: 'emily@example.com', role: 'Editor', department: 'Marketing', status: 'Active', lastLogin: '2026-04-07 09:15' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Viewer', department: 'Sales', status: 'Active', lastLogin: '2026-04-06 14:20' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Admin', department: 'HR', status: 'Active', lastLogin: '2026-04-06 11:45' },
  { id: 5, name: 'David Lee', email: 'david@example.com', role: 'Editor', department: 'Engineering', status: 'Inactive', lastLogin: '2026-03-28 08:00' },
  { id: 6, name: 'Lisa Wang', email: 'lisa@example.com', role: 'Viewer', department: 'Finance', status: 'Active', lastLogin: '2026-04-07 08:30' },
  { id: 7, name: 'Robert Taylor', email: 'robert@example.com', role: 'Viewer', department: 'Sales', status: 'Active', lastLogin: '2026-04-05 16:00' },
  { id: 8, name: 'Jennifer Martinez', email: 'jennifer@example.com', role: 'Editor', department: 'Marketing', status: 'Active', lastLogin: '2026-04-07 07:45' },
  { id: 9, name: 'James Anderson', email: 'james@example.com', role: 'Viewer', department: 'Engineering', status: 'Inactive', lastLogin: '2026-03-15 12:00' },
  { id: 10, name: 'Jessica Thomas', email: 'jessica@example.com', role: 'Admin', department: 'HR', status: 'Active', lastLogin: '2026-04-07 11:00' },
  { id: 11, name: 'Christopher Davis', email: 'chris@example.com', role: 'Viewer', department: 'Finance', status: 'Active', lastLogin: '2026-04-06 10:30' },
  { id: 12, name: 'Amanda Wilson', email: 'amanda@example.com', role: 'Editor', department: 'Marketing', status: 'Active', lastLogin: '2026-04-07 09:00' },
  { id: 13, name: 'Daniel Garcia', email: 'daniel@example.com', role: 'Viewer', department: 'Sales', status: 'Active', lastLogin: '2026-04-04 15:00' },
  { id: 14, name: 'Matthew Jackson', email: 'matthew@example.com', role: 'Viewer', department: 'Engineering', status: 'Inactive', lastLogin: '2026-02-20 09:00' },
  { id: 15, name: 'Ashley White', email: 'ashley@example.com', role: 'Editor', department: 'HR', status: 'Active', lastLogin: '2026-04-07 08:15' },
])

const users = computed(() => {
  if (!searchText.value) return allUsers.value
  const lower = searchText.value.toLowerCase()
  return allUsers.value.filter(
    (u) =>
      u.name.toLowerCase().includes(lower) ||
      u.email.toLowerCase().includes(lower) ||
      u.role.toLowerCase().includes(lower) ||
      u.department.toLowerCase().includes(lower)
  )
})

function onRowClick(row) {
  // Could open detail panel
}

function onSelectionChange(ids) {
  selectedIds.value = ids
}

function addUser() {
  const maxId = allUsers.value.reduce((max, u) => Math.max(max, u.id), 0)
  allUsers.value.push({
    id: maxId + 1,
    ...newUser.value,
    status: 'Active',
    lastLogin: new Date().toISOString().slice(0, 16).replace('T', ' '),
  })
  newUser.value = { name: '', email: '', role: 'Viewer', department: 'Engineering' }
  showAddDialog.value = false
}

function editSelected() {
  // Placeholder
}

function deleteSelected() {
  allUsers.value = allUsers.value.filter((u) => !selectedIds.value.includes(u.id))
  selectedIds.value = []
}

function loadUsers() {
  // Placeholder for refresh
}
</script>
