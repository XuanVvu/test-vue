<script setup lang="ts">
const { label } = defineProps<{label: string}>()
</script>
<template>
    <div>{{label}}</div>
</template>