<template>
  <div>
    <!-- Dashboard title bar -->
    <ExtPanel title="Dashboard" icon="&#9632;">
      <template #toolbar>
        <div class="ext-toolbar">
          <button class="ext-btn ext-btn-primary" @click="refreshAll">&#8635; Refresh All</button>
          <div class="ext-toolbar-separator"></div>
          <span class="ext-toolbar-text">Last updated: {{ lastUpdated }}</span>
        </div>
      </template>

      <!-- Stats Cards using Tabler grid & cards -->
      <div class="row row-deck row-cards" style="margin: 0 -4px;">
        <div class="col-sm-6 col-lg-3" style="padding: 0 4px;" v-for="stat in stats" :key="stat.label">
          <div class="card" style="margin-bottom: 8px;">
            <div class="card-body" style="padding: 12px;">
              <div class="d-flex align-items-center">
                <div class="subheader" style="font-size: 11px; color: var(--ext-text-muted);">{{ stat.label }}</div>
              </div>
              <div class="h1 mb-0" style="font-size: 24px; color: var(--ext-primary-dark);">{{ stat.value }}</div>
              <div style="font-size: 11px; margin-top: 4px;">
                <span :style="{ color: stat.changeColor }">{{ stat.change }}</span>
                <span style="color: #999;"> vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExtPanel>

    <!-- Tab Panel for charts area -->
    <ExtTabPanel :tabs="chartTabs">
      <template #tab-0>
        <ExtPanel title="Recent Orders" icon="&#128196;" :collapsible="true" noPadding>
          <div class="ext-grid" style="border: none;">
            <table>
              <thead>
                <tr>
                  <th style="width: 80px;">#</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th style="width: 100px; text-align: right;">Amount</th>
                  <th style="width: 100px;">Status</th>
                  <th style="width: 140px;">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in recentOrders" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>{{ order.customer }}</td>
                  <td>{{ order.product }}</td>
                  <td style="text-align: right;">${{ order.amount.toFixed(2) }}</td>
                  <td>
                    <span class="badge" :class="statusClass(order.status)">{{ order.status }}</span>
                  </td>
                  <td>{{ order.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ExtPanel>
      </template>

      <template #tab-1>
        <ExtPanel title="Activity Log" icon="&#128203;">
          <div class="ext-tree">
            <div v-for="activity in activities" :key="activity.id" class="ext-tree-node-content" style="padding: 4px 8px;">
              <span class="ext-tree-icon" v-html="activity.icon"></span>
              <span style="flex: 1;">
                <strong>{{ activity.user }}</strong> {{ activity.action }}
              </span>
              <span style="font-size: 11px; color: #999;">{{ activity.time }}</span>
            </div>
          </div>
        </ExtPanel>
      </template>
    </ExtTabPanel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ExtPanel from '@/components/ExtPanel.vue'
import ExtTabPanel from '@/components/ExtTabPanel.vue'

const lastUpdated = ref(new Date().toLocaleTimeString())

const stats = ref([
  { label: 'Total Users', value: '2,847', change: '+12.5%', changeColor: '#2b9348' },
  { label: 'Revenue', value: '$48,200', change: '+8.3%', changeColor: '#2b9348' },
  { label: 'Orders', value: '1,423', change: '-2.1%', changeColor: '#d32f2f' },
  { label: 'Conversion', value: '3.6%', change: '+0.4%', changeColor: '#2b9348' },
])

const chartTabs = [
  { title: 'Orders', icon: '&#128196;' },
  { title: 'Activity', icon: '&#128203;' },
]

const recentOrders = ref([
  { id: 1001, customer: 'John Smith', product: 'Enterprise License', amount: 1299.00, status: 'Completed', date: '2026-04-07' },
  { id: 1002, customer: 'Emily Chen', product: 'Pro Subscription', amount: 499.00, status: 'Pending', date: '2026-04-06' },
  { id: 1003, customer: 'Michael Brown', product: 'Basic Plan', amount: 99.00, status: 'Completed', date: '2026-04-06' },
  { id: 1004, customer: 'Sarah Williams', product: 'Enterprise License', amount: 1299.00, status: 'Processing', date: '2026-04-05' },
  { id: 1005, customer: 'David Lee', product: 'Pro Subscription', amount: 499.00, status: 'Cancelled', date: '2026-04-05' },
])

const activities = ref([
  { id: 1, user: 'Admin', action: 'updated system settings', icon: '&#9881;', time: '2 min ago' },
  { id: 2, user: 'John Smith', action: 'placed a new order #1001', icon: '&#128176;', time: '15 min ago' },
  { id: 3, user: 'Emily Chen', action: 'registered a new account', icon: '&#128100;', time: '1 hour ago' },
  { id: 4, user: 'System', action: 'completed daily backup', icon: '&#128190;', time: '3 hours ago' },
  { id: 5, user: 'Michael Brown', action: 'submitted a support ticket', icon: '&#127991;', time: '5 hours ago' },
])

function statusClass(status) {
  const map = {
    Completed: 'bg-success',
    Pending: 'bg-warning',
    Processing: 'bg-info',
    Cancelled: 'bg-danger',
  }
  return map[status] || 'bg-secondary'
}

function refreshAll() {
  lastUpdated.value = new Date().toLocaleTimeString()
}
</script>
