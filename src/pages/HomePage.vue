<script setup lang="ts">
import { inject } from 'vue';
import DragAndDrop from '../components/DragAndDrop.vue'


const message = inject("message")
</script>

<template>
    <div>Home Page11</div>
    <div>{{ message }}</div>
    <drag-and-drop />
    <router-link to="/test">Test Page</router-link>
</template>