<script setup lang="ts">
const props = defineProps<{
    isOpen: Boolean
}>()

const emits = defineEmits<{
    close: () => void
}>()

</script>

<template>
    <UModal v-bind:modelValue="isOpen" v-on:close="() => emits('close')">
        <UButton @click="() => emits('close')">Close</UButton>
    </UModal>
</template>
