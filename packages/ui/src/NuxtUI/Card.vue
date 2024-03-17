<template>
  <UCard>
    <template #header v-if="$slots.header">
        <slot name="header"></slot>
    </template>
    <slot></slot>
    <template #footer v-if="$slots.footer">
        <slot name="footer"></slot>
    </template>
  </UCard>
</template>
