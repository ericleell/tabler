<template>
  <div class="ext-viewport">
    <!-- Top Toolbar / Menu Bar -->
    <AppHeader />

    <div class="ext-viewport-body">
      <!-- West Region: Navigation Tree -->
      <SidebarTree class="ext-region-west ext-nav-sidebar" />

      <!-- Splitter -->
      <div class="ext-splitter"></div>

      <!-- Center Region: Main Content -->
      <div class="ext-region-center">
        <router-view />
      </div>
    </div>

    <!-- Status Bar -->
    <StatusBar />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import SidebarTree from '@/components/SidebarTree.vue'
import StatusBar from '@/components/StatusBar.vue'
</script>
