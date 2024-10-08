<script setup lang="ts">
import { inject } from 'vue';


const message = inject("message")
</script>

<template>
    <div>Home Page11</div>
    <div>{{ message }}</div>
    <router-link to="/test">Test Page</router-link>
</template>