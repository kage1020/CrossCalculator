<script setup lang="ts">
const props = withDefaults(defineProps<{
    size?: string | number
    color?: string
}>(), {
    size: '1em',
    color: 'currentColor'
})
</script>
<template>
	<svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" :color="color" viewBox="0 0 24 24">
		<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
	</svg>
</template>
