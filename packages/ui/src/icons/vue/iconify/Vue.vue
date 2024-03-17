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
		<path fill="currentColor" d="M24 1.61h-9.94L12 5.16L9.94 1.61H0l12 20.78ZM12 14.08L5.16 2.23h4.43L12 6.41l2.41-4.18h4.43Z" />
	</svg>
</template>
