<script setup lang="ts">
import pokemonIcon from "../assets/logo.png";
</script>

<template>
  <div class="drawer-side">
    <label
      for="my-drawer-2"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>
    <ul class="menu bg-base-100 border-r border-gray-300 text-base-content min-h-full w-72 p-4">
      <li>
        <a>
          <img :src="pokemonIcon" alt="Pokemon Icon" class="w-10 h-10" />
          <span class="font-bold text-lg">PokeBerry</span>
        </a>
      </li>
      <ul class="mt-5">
        <li>
          <RouterLink to="/" class="font-bold text-lg text-gray-700">
            <i class="pi pi-objects-column"></i>{{ $t('dashboard') }}
          </RouterLink>
        </li>
      </ul>
    </ul>
  </div>
</template>