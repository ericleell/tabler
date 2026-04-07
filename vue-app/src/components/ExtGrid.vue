<template>
  <div class="ext-panel">
    <div class="ext-panel-header" v-if="title">
      <span v-if="icon" class="panel-icon" v-html="icon"></span>
      <span class="panel-title">{{ title }}</span>
    </div>

    <!-- Toolbar -->
    <slot name="toolbar"></slot>

    <!-- Grid -->
    <div class="ext-grid" style="border: none;">
      <table>
        <thead>
          <tr>
            <th v-if="checkboxSelection" class="row-checker" style="width: 30px;">
              <input type="checkbox" :checked="allSelected" @change="toggleAll" />
            </th>
            <th v-if="rowNumbers" style="width: 36px; text-align: center;">#</th>
            <th
              v-for="col in columns"
              :key="col.field"
              :style="{ width: col.width || 'auto', textAlign: col.align || 'left' }"
              :class="{ sortable: col.sortable }"
              @click="col.sortable ? toggleSort(col.field) : null"
            >
              {{ col.header }}
              <span v-if="col.sortable && sortField === col.field" class="sort-indicator">
                {{ sortDir === 'asc' ? '▲' : '▼' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, idx) in sortedData"
            :key="row.id || idx"
            :class="{ selected: isSelected(row) }"
            @click="onRowClick(row)"
          >
            <td v-if="checkboxSelection" class="row-checker">
              <input type="checkbox" :checked="isSelected(row)" @change.stop="toggleRow(row)" @click.stop />
            </td>
            <td v-if="rowNumbers" style="text-align: center; color: #999; font-size: 11px;">
              {{ (currentPage - 1) * pageSize + idx + 1 }}
            </td>
            <td
              v-for="col in columns"
              :key="col.field"
              :style="{ textAlign: col.align || 'left' }"
            >
              <slot :name="'cell-' + col.field" :row="row" :value="row[col.field]">
                {{ row[col.field] }}
              </slot>
            </td>
          </tr>
          <tr v-if="sortedData.length === 0">
            <td :colspan="totalCols" style="text-align: center; padding: 20px; color: #999;">
              No data to display
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paging Toolbar -->
    <div v-if="pageable" class="ext-paging-toolbar">
      <button class="ext-btn ext-btn-small" :disabled="currentPage <= 1" @click="goPage(1)">&#9664;&#9664;</button>
      <button class="ext-btn ext-btn-small" :disabled="currentPage <= 1" @click="goPage(currentPage - 1)">&#9664;</button>
      <div class="ext-toolbar-separator"></div>
      <span>Page</span>
      <input
        type="number"
        :value="currentPage"
        :min="1"
        :max="totalPages"
        style="width: 40px; text-align: center; padding: 2px; border: 1px solid var(--ext-field-border); font-size: 11px;"
        @change="goPage(Number($event.target.value))"
      />
      <span>of {{ totalPages }}</span>
      <div class="ext-toolbar-separator"></div>
      <button class="ext-btn ext-btn-small" :disabled="currentPage >= totalPages" @click="goPage(currentPage + 1)">&#9654;</button>
      <button class="ext-btn ext-btn-small" :disabled="currentPage >= totalPages" @click="goPage(totalPages)">&#9654;&#9654;</button>
      <div class="ext-toolbar-separator"></div>
      <button class="ext-btn ext-btn-small" @click="$emit('refresh')">&#8635;</button>
      <span class="page-info">
        Displaying {{ rangeStart }}–{{ rangeEnd }} of {{ data.length }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  columns: { type: Array, required: true },
  data: { type: Array, required: true },
  pageable: { type: Boolean, default: false },
  pageSize: { type: Number, default: 10 },
  checkboxSelection: { type: Boolean, default: false },
  rowNumbers: { type: Boolean, default: false },
})

const emit = defineEmits(['row-click', 'selection-change', 'refresh'])

const currentPage = ref(1)
const sortField = ref('')
const sortDir = ref('asc')
const selectedRows = ref(new Set())

const totalCols = computed(() => {
  let c = props.columns.length
  if (props.checkboxSelection) c++
  if (props.rowNumbers) c++
  return c
})

const sortedData = computed(() => {
  let d = [...props.data]
  if (sortField.value) {
    d.sort((a, b) => {
      const va = a[sortField.value]
      const vb = b[sortField.value]
      const cmp = va < vb ? -1 : va > vb ? 1 : 0
      return sortDir.value === 'asc' ? cmp : -cmp
    })
  }
  if (props.pageable) {
    const start = (currentPage.value - 1) * props.pageSize
    d = d.slice(start, start + props.pageSize)
  }
  return d
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(props.data.length / props.pageSize))
})

const rangeStart = computed(() => {
  return Math.min((currentPage.value - 1) * props.pageSize + 1, props.data.length)
})

const rangeEnd = computed(() => {
  return Math.min(currentPage.value * props.pageSize, props.data.length)
})

const allSelected = computed(() => {
  return sortedData.value.length > 0 && sortedData.value.every((r) => selectedRows.value.has(r.id))
})

function toggleSort(field) {
  if (sortField.value === field) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDir.value = 'asc'
  }
}

function goPage(page) {
  const p = Math.max(1, Math.min(page, totalPages.value))
  currentPage.value = p
}

function onRowClick(row) {
  emit('row-click', row)
}

function isSelected(row) {
  return selectedRows.value.has(row.id)
}

function toggleRow(row) {
  const s = new Set(selectedRows.value)
  if (s.has(row.id)) {
    s.delete(row.id)
  } else {
    s.add(row.id)
  }
  selectedRows.value = s
  emit('selection-change', [...s])
}

function toggleAll() {
  if (allSelected.value) {
    selectedRows.value = new Set()
  } else {
    const s = new Set()
    sortedData.value.forEach((r) => s.add(r.id))
    selectedRows.value = s
  }
  emit('selection-change', [...selectedRows.value])
}
</script>
