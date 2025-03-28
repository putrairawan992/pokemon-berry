<template>
  <div class="w-full flex items-center justify-between h-15 px-5">
    <h1 class="font-bold text-2xl">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: String,
  },
};
</script>
