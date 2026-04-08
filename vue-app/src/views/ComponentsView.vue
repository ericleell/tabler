<template>
  <div>
    <ExtBreadcrumb
      :items="[
        { label: 'Home', icon: '&#127968;' },
        { label: 'Components' },
      ]"
    />

    <ExtPanel title="Component Showcase" icon="&#128300;">
      <template #toolbar>
        <div class="ext-toolbar">
          <span class="ext-toolbar-text">Interactive demo of all available components</span>
          <div style="flex: 1;"></div>
          <button class="ext-btn ext-btn-small" @click="resetAll">&#8634; Reset</button>
        </div>
      </template>

      <!-- Buttons & Split Buttons -->
      <fieldset class="ext-fieldset">
        <legend>Buttons</legend>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: flex-start;">
          <button class="ext-btn">Default Button</button>
          <button class="ext-btn ext-btn-primary">Primary Button</button>
          <button class="ext-btn ext-btn-danger">Danger Button</button>
          <button class="ext-btn ext-btn-small">Small Button</button>
          <button class="ext-btn" disabled>Disabled</button>

          <div class="ext-toolbar-separator" style="height: 24px;"></div>

          <ExtSplitButton
            label="Save"
            icon="&#128190;"
            btnType="primary"
            :menuItems="splitMenuItems"
            @click="onSplitClick"
            @menu-click="onSplitMenuClick"
          />

          <ExtSplitButton
            label="Export"
            icon="&#128424;"
            :menuItems="exportMenuItems"
            @click="onExportClick"
            @menu-click="onSplitMenuClick"
          />
        </div>
      </fieldset>

      <!-- Form Fields -->
      <fieldset class="ext-fieldset">
        <legend>Form Fields</legend>

        <ExtFormField
          label="Text Input"
          v-model="formData.name"
          placeholder="Enter your name"
          help="Standard text input field"
        />

        <ExtFormField
          label="Email"
          v-model="formData.email"
          type="email"
          placeholder="email@example.com"
          required
          :error="formErrors.email"
        />

        <ExtFormField
          label="Password"
          v-model="formData.password"
          type="password"
          placeholder="Enter password"
        />

        <ExtFormField
          label="Description"
          v-model="formData.description"
          type="textarea"
          :rows="3"
          placeholder="Enter description..."
        />

        <ExtFormField
          label="Role"
          v-model="formData.role"
          type="select"
          :options="roleOptions"
          placeholder="Select a role"
        />

        <ExtComboBox
          label="Department"
          v-model="formData.department"
          :options="departmentOptions"
          searchable
          help="Type to search departments"
        />

        <div style="text-align: right; padding-top: 8px;">
          <button class="ext-btn ext-btn-primary" @click="validateForm">&#10003; Validate</button>
          <button class="ext-btn" style="margin-left: 6px;" @click="resetForm">&#8634; Reset</button>
        </div>
      </fieldset>

      <!-- Progress Bars -->
      <fieldset class="ext-fieldset">
        <legend>Progress Bars</legend>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <span style="font-size: 11px; color: var(--ext-text-muted);">Loading ({{ progress1 }}%)</span>
            <ExtProgressBar :value="progress1" />
          </div>
          <div>
            <span style="font-size: 11px; color: var(--ext-text-muted);">Upload Progress</span>
            <ExtProgressBar :value="progress2" :format="(v) => v + '% uploaded'" />
          </div>
          <div>
            <span style="font-size: 11px; color: var(--ext-text-muted);">External Label</span>
            <ExtProgressBar :value="progress3" :textInside="false" />
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="ext-btn ext-btn-small" @click="animateProgress">&#9654; Animate</button>
            <button class="ext-btn ext-btn-small" @click="resetProgress">&#8634; Reset</button>
          </div>
        </div>
      </fieldset>

      <!-- Tooltips -->
      <fieldset class="ext-fieldset">
        <legend>Tooltips</legend>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <ExtTooltip text="Tooltip on top" placement="top">
            <button class="ext-btn">Top</button>
          </ExtTooltip>
          <ExtTooltip text="Tooltip on bottom" placement="bottom">
            <button class="ext-btn">Bottom</button>
          </ExtTooltip>
          <ExtTooltip text="Tooltip on left" placement="left">
            <button class="ext-btn">Left</button>
          </ExtTooltip>
          <ExtTooltip text="Tooltip on right" placement="right">
            <button class="ext-btn">Right</button>
          </ExtTooltip>
          <ExtTooltip text="This is a helpful tooltip with more info" placement="top">
            <span style="cursor: help; text-decoration: underline dotted; color: var(--ext-primary);">Hover for info</span>
          </ExtTooltip>
        </div>
      </fieldset>

      <!-- MessageBox Dialogs -->
      <fieldset class="ext-fieldset">
        <legend>MessageBox Dialogs</legend>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="ext-btn" @click="showMsg('info')">&#9432; Info</button>
          <button class="ext-btn" @click="showMsg('warning')">&#9888; Warning</button>
          <button class="ext-btn" @click="showMsg('error')">&#10060; Error</button>
          <button class="ext-btn" @click="showMsg('question')">&#10067; Confirm</button>
          <button class="ext-btn" @click="showMsg('prompt')">&#9998; Prompt</button>
        </div>
        <div v-if="msgResult" style="margin-top: 8px; font-size: 12px; color: var(--ext-text-muted);">
          Last result: <strong>{{ msgResult }}</strong>
        </div>
      </fieldset>

      <!-- Tabs -->
      <fieldset class="ext-fieldset">
        <legend>Tab Panel</legend>
        <ExtTabPanel :tabs="demoTabs">
          <template #tab-0>
            <p style="margin: 8px 0;">This is the first tab content. Tab panels support dynamic content via named slots.</p>
          </template>
          <template #tab-1>
            <p style="margin: 8px 0;">Second tab with different content. Notice how tabs respond to the active theme.</p>
          </template>
          <template #tab-2>
            <p style="margin: 8px 0;">Third tab. You can add as many tabs as needed.</p>
          </template>
        </ExtTabPanel>
      </fieldset>

      <!-- Grid -->
      <fieldset class="ext-fieldset">
        <legend>Data Grid</legend>
        <ExtGrid
          :columns="gridColumns"
          :data="gridData"
          :pageable="true"
          :pageSize="5"
          :checkboxSelection="true"
          :rowNumbers="true"
          @row-click="onGridRowClick"
        >
          <template #cell-status="{ value }">
            <span class="badge" :class="value === 'Active' ? 'bg-success' : 'bg-secondary'">{{ value }}</span>
          </template>
        </ExtGrid>
      </fieldset>

      <!-- Window Dialog -->
      <fieldset class="ext-fieldset">
        <legend>Window / Dialog</legend>
        <button class="ext-btn ext-btn-primary" @click="showWindow = true">&#128448; Open Window</button>
      </fieldset>
    </ExtPanel>

    <!-- Dialogs -->
    <ExtMessageBox
      v-model:visible="msgBoxVisible"
      :title="msgBoxTitle"
      :message="msgBoxMessage"
      :type="msgBoxType"
      @confirm="onMsgConfirm"
      @cancel="onMsgCancel"
    />

    <ExtWindow
      :visible="showWindow"
      title="Sample Window"
      icon="&#128448;"
      width="500px"
      @close="showWindow = false"
    >
      <p>This is a modal window component. It can contain any content including forms, grids, or other components.</p>
      <ExtFormField label="Sample Input" v-model="windowInput" placeholder="Type here..." />
      <template #footer>
        <button class="ext-btn ext-btn-primary" @click="showWindow = false">&#10003; OK</button>
        <button class="ext-btn" @click="showWindow = false">&#10005; Cancel</button>
      </template>
    </ExtWindow>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ExtPanel from '@/components/ExtPanel.vue'
import ExtFormField from '@/components/ExtFormField.vue'
import ExtComboBox from '@/components/ExtComboBox.vue'
import ExtProgressBar from '@/components/ExtProgressBar.vue'
import ExtTooltip from '@/components/ExtTooltip.vue'
import ExtMessageBox from '@/components/ExtMessageBox.vue'
import ExtSplitButton from '@/components/ExtSplitButton.vue'
import ExtBreadcrumb from '@/components/ExtBreadcrumb.vue'
import ExtTabPanel from '@/components/ExtTabPanel.vue'
import ExtGrid from '@/components/ExtGrid.vue'
import ExtWindow from '@/components/ExtWindow.vue'

/* Form */
const formData = reactive({
  name: '',
  email: '',
  password: '',
  description: '',
  role: '',
  department: '',
})

const formErrors = reactive({
  email: '',
})

const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'moderator', label: 'Moderator' },
]

const departmentOptions = [
  { value: 'eng', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
  { value: 'legal', label: 'Legal' },
  { value: 'operations', label: 'Operations' },
]

function validateForm() {
  formErrors.email = ''
  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    formErrors.email = 'Please enter a valid email address'
  }
}

function resetForm() {
  Object.assign(formData, { name: '', email: '', password: '', description: '', role: '', department: '' })
  formErrors.email = ''
}

/* Progress */
const progress1 = ref(35)
const progress2 = ref(68)
const progress3 = ref(50)

function animateProgress() {
  progress1.value = 0
  progress2.value = 0
  progress3.value = 0
  const interval = setInterval(() => {
    progress1.value = Math.min(100, progress1.value + Math.random() * 8)
    progress2.value = Math.min(100, progress2.value + Math.random() * 5)
    progress3.value = Math.min(100, progress3.value + Math.random() * 10)
    if (progress1.value >= 100 && progress2.value >= 100 && progress3.value >= 100) {
      clearInterval(interval)
    }
  }, 200)
}

function resetProgress() {
  progress1.value = 35
  progress2.value = 68
  progress3.value = 50
}

/* MessageBox */
const msgBoxVisible = ref(false)
const msgBoxTitle = ref('')
const msgBoxMessage = ref('')
const msgBoxType = ref('info')
const msgResult = ref('')

function showMsg(type) {
  msgBoxType.value = type
  const titles = { info: 'Information', warning: 'Warning', error: 'Error', question: 'Confirm', prompt: 'Input Required' }
  const messages = {
    info: 'This is an informational message. Operation completed successfully.',
    warning: 'Warning: This action may have unintended consequences.',
    error: 'Error: Unable to complete the requested operation.',
    question: 'Are you sure you want to proceed with this action?',
    prompt: 'Please enter a value:',
  }
  msgBoxTitle.value = titles[type]
  msgBoxMessage.value = messages[type]
  msgBoxVisible.value = true
}

function onMsgConfirm(result) {
  msgResult.value = typeof result === 'string' ? `Input: "${result}"` : 'Confirmed'
}

function onMsgCancel() {
  msgResult.value = 'Cancelled'
}

/* Split Buttons */
const splitMenuItems = [
  { label: 'Save', icon: '&#128190;' },
  { label: 'Save As...', icon: '&#128196;' },
  { separator: true },
  { label: 'Save All', icon: '&#128451;' },
]

const exportMenuItems = [
  { label: 'Export as CSV', icon: '&#128196;' },
  { label: 'Export as PDF', icon: '&#128196;' },
  { label: 'Export as Excel', icon: '&#128196;' },
  { separator: true },
  { label: 'Print', icon: '&#128438;' },
]

function onSplitClick() {
  msgResult.value = 'Split button main clicked'
}

function onExportClick() {
  msgResult.value = 'Export button clicked'
}

function onSplitMenuClick(item) {
  msgResult.value = `Menu: "${item.label}"`
}

/* Tabs */
const demoTabs = [
  { title: 'Tab One', icon: '&#128196;' },
  { title: 'Tab Two', icon: '&#128202;' },
  { title: 'Tab Three', icon: '&#9881;' },
]

/* Grid */
const gridColumns = [
  { field: 'name', header: 'Name', sortable: true },
  { field: 'email', header: 'Email', sortable: true },
  { field: 'role', header: 'Role', width: '100px', sortable: true },
  { field: 'status', header: 'Status', width: '90px' },
]

const gridData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Dan Brown', email: 'dan@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Active' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active' },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', role: 'Viewer', status: 'Inactive' },
]

function onGridRowClick(row) {
  msgResult.value = `Grid row clicked: ${row.name}`
}

/* Window */
const showWindow = ref(false)
const windowInput = ref('')

/* Reset All */
function resetAll() {
  resetForm()
  resetProgress()
  msgResult.value = ''
}
</script>
