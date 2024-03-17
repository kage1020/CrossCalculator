<script setup lang="ts">
import { ButtonVariant } from "#ui/types";

const props = defineProps<{
    variant?: ButtonVariant
}>()
</script>

<template>
  <UButton :variant="variant"><slot></slot></UButton>
</template>
