<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <Navbar />
      <div class="h-auto">
        <router-view />
      </div>
    </div>
    <Sidebar />
  </div>
</template>

<script lang="ts" setup>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import "primeicons/primeicons.css";
</script>
