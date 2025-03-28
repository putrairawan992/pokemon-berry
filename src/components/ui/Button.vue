<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const props = defineProps<Props>();

const classes = computed(() => {
  return [
    props.variant ? `btn-${props.variant}` : "btn-primary", // Default primary jika tidak dipilih
    props.size === "sm" ? "btn-sm" : "",
    props.size === "md" ? "btn-md" : "",
    props.size === "lg" ? "btn-lg" : "",
    props.disabled ? "btn-disabled opacity-50 cursor-not-allowed" : "",
  ];
});
</script>

<template>
  <button :class="classes" :disabled="disabled">
    <slot>Button</slot>
  </button>
</template>
