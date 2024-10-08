<script setup lang="ts">
import TreeItem from './TreeItem.vue';
type TreeData = {
    id: number;
    label: string;
    children?: TreeData[]
}
const { data, depth, openItems } = defineProps<{
    data: TreeData[],
    depth: number,
    openItems:any[]
}>()

const emit = defineEmits(['toggle-item'])

const isOpen = (item: TreeData) => {
  return openItems.includes(item);
};

const toggle = (item: any) => {
    emit('toggle-item', item);
};

</script>
<template>
    <div v-for="item in data" :key="item.id" :style="{ marginInlineStart: depth * 30 + 'px' }">
        <div class="d-flex" @click="toggle(item)">
            <tree-item :label="item.label"/>
            <span v-if="item.children">{{ isOpen(item) ? '▼' : '▶' }}</span>
        </div>
        <tree v-if="isOpen(item) && item.children" :data="item.children" :depth="1" :openItems="openItems" @toggle-item="toggle"/>

    </div>
</template>

<style>
.d-flex {
    display: flex;
}
</style>