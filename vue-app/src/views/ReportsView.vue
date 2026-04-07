<template>
  <div>
    <ExtPanel title="Reports" icon="&#128202;">
      <template #toolbar>
        <div class="ext-toolbar">
          <button class="ext-btn ext-btn-primary" @click="generateReport">&#128196; Generate Report</button>
          <div class="ext-toolbar-separator"></div>
          <span class="ext-toolbar-text">Report Type:</span>
          <select v-model="reportType" style="padding: 3px 6px; border: 1px solid var(--ext-field-border); font-size: 11px; border-radius: 1px;">
            <option value="sales">Sales</option>
            <option value="traffic">Traffic</option>
            <option value="users">Users</option>
          </select>
          <div class="ext-toolbar-separator"></div>
          <span class="ext-toolbar-text">Period:</span>
          <select v-model="period" style="padding: 3px 6px; border: 1px solid var(--ext-field-border); font-size: 11px; border-radius: 1px;">
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <div style="flex: 1;"></div>
          <button class="ext-btn">&#128424; Export CSV</button>
          <button class="ext-btn">&#128438; Print</button>
        </div>
      </template>

      <!-- Summary cards -->
      <div class="row" style="margin: 0 -4px 8px;">
        <div class="col-md-3" style="padding: 0 4px;" v-for="summary in summaries" :key="summary.label">
          <div class="card" style="margin-bottom: 0;">
            <div class="card-body" style="padding: 10px;">
              <div style="font-size: 11px; color: var(--ext-text-muted);">{{ summary.label }}</div>
              <div style="font-size: 20px; font-weight: 700; color: var(--ext-primary-dark);">{{ summary.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Data grid -->
      <ExtGrid
        :columns="reportColumns"
        :data="reportData"
        :pageable="true"
        :page-size="8"
        :row-numbers="true"
      />
    </ExtPanel>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ExtPanel from '@/components/ExtPanel.vue'
import ExtGrid from '@/components/ExtGrid.vue'

const reportType = ref('sales')
const period = ref('month')

const summaries = ref([
  { label: 'Total Revenue', value: '$142,580' },
  { label: 'Total Orders', value: '3,847' },
  { label: 'Avg. Order Value', value: '$37.06' },
  { label: 'Growth Rate', value: '+14.2%' },
])

const reportColumns = [
  { field: 'date', header: 'Date', sortable: true, width: '120px' },
  { field: 'category', header: 'Category', sortable: true },
  { field: 'orders', header: 'Orders', sortable: true, width: '80px', align: 'right' },
  { field: 'revenue', header: 'Revenue', sortable: true, width: '120px', align: 'right' },
  { field: 'profit', header: 'Profit', sortable: true, width: '120px', align: 'right' },
  { field: 'margin', header: 'Margin', sortable: true, width: '80px', align: 'right' },
]

const reportData = ref([
  { id: 1, date: '2026-04-01', category: 'Electronics', orders: 145, revenue: '$12,300', profit: '$3,690', margin: '30%' },
  { id: 2, date: '2026-04-01', category: 'Clothing', orders: 230, revenue: '$8,450', profit: '$2,958', margin: '35%' },
  { id: 3, date: '2026-04-02', category: 'Electronics', orders: 132, revenue: '$11,200', profit: '$3,360', margin: '30%' },
  { id: 4, date: '2026-04-02', category: 'Books', orders: 89, revenue: '$2,670', profit: '$1,068', margin: '40%' },
  { id: 5, date: '2026-04-03', category: 'Clothing', orders: 210, revenue: '$7,800', profit: '$2,730', margin: '35%' },
  { id: 6, date: '2026-04-03', category: 'Electronics', orders: 167, revenue: '$14,100', profit: '$4,230', margin: '30%' },
  { id: 7, date: '2026-04-04', category: 'Home & Garden', orders: 98, revenue: '$5,400', profit: '$1,620', margin: '30%' },
  { id: 8, date: '2026-04-04', category: 'Books', orders: 76, revenue: '$2,280', profit: '$912', margin: '40%' },
  { id: 9, date: '2026-04-05', category: 'Electronics', orders: 155, revenue: '$13,100', profit: '$3,930', margin: '30%' },
  { id: 10, date: '2026-04-05', category: 'Clothing', orders: 198, revenue: '$7,200', profit: '$2,520', margin: '35%' },
  { id: 11, date: '2026-04-06', category: 'Home & Garden', orders: 112, revenue: '$6,200', profit: '$1,860', margin: '30%' },
  { id: 12, date: '2026-04-06', category: 'Books', orders: 95, revenue: '$2,850', profit: '$1,140', margin: '40%' },
  { id: 13, date: '2026-04-07', category: 'Electronics', orders: 178, revenue: '$15,200', profit: '$4,560', margin: '30%' },
  { id: 14, date: '2026-04-07', category: 'Clothing', orders: 245, revenue: '$9,100', profit: '$3,185', margin: '35%' },
  { id: 15, date: '2026-04-07', category: 'Home & Garden', orders: 88, revenue: '$4,800', profit: '$1,440', margin: '30%' },
])

function generateReport() {
  // Placeholder
}
</script>
