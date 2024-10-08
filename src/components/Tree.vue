<script setup lang="ts">
import { ref } from 'vue';
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

const emit = defineEmits(['toggle-item', 'update-tree'])
const draggedItem = ref(null)

const isOpen = (item: TreeData) => {
  return openItems.includes(item);
};

const toggle = (item: any) => {
    emit('toggle-item', item);
};

const onDragStart = (item: any, event: any) => {
    
    draggedItem.value = item;
    console.log(draggedItem.value);
    event.dataTransfer.effectAllowed = 'move'
}

const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move'
}

const onDrop = (targetItem: any, event: any) => {
    event.preventDefault()
    console.log(draggedItem.value);
    if(draggedItem.value !== targetItem) {
        removeItem(data, draggedItem)

        if(!targetItem.children) {
            targetItem.children = []
        } else {
            targetItem.children.push(draggedItem)
        }

        emit('update-tree', data)
        draggedItem.value = null;

    }
}

const removeItem = (arr: any, itemToRemove: any) => {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === itemToRemove) {
            console.log(arr[i]);
            arr.splice(i, 1);
            return true;
        }
        if(arr[i].children) {
            const removed = removeItem(arr[i].children, itemToRemove);
            if(removed) {
                return true;
            }
        }
    }
    return false
}

const updateTree = (newTree: any) => {
    emit('update-tree', newTree);
};

</script>
<template>
    <div v-for="item in data" :style="{ marginInlineStart: depth * 30 + 'px' }">
        <div class="d-flex" @click="toggle(item)" @dragstart="onDragStart(item, $event)" @dragover="onDragOver($event)" @drop="onDrop(item, $event)" draggable="true">
            <tree-item :label="item.label"/>
            <span v-if="item.children">{{ isOpen(item) ? '▼' : '▶' }}</span>
        </div>
        <tree v-if="isOpen(item) && item.children" :data="item.children" :depth="1" :openItems="openItems" @toggle-item="toggle" @update-tree="updateTree"/>

    </div>
</template>

<style>
.d-flex {
    display: flex;
}
</style>