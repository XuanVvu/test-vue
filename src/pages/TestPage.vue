<script setup lang="ts">
import { ref } from 'vue';
import Tree from '../components/Tree.vue';


const arr = ref([
  {
    id: 1,
    label: 'text1',
    children: [
      {
        id: 2,
        label: 'text2',
        children: [
          {
            id: 3,
            label: 'text3',
            children: [
                {
                  id: 4,
                  label: 'text4',
                  children: [
                      {
                        id: 5,
                        label: 'text5',
                      }
                  ]
                }
             ]
          },
          {
            label: 'text3',
            children: [
                {
                    label: 'text4',
                    children: [
                        {
                            label: 'text5',
                        }
                    ]
                }
             ]
          }
        ]
      },
      
    ]
  },

]);

const openItems = ref<any>([])
const k = ref(0)

const handleToggle = (item: any) => {
  k.value ++
  if (openItems.value.includes(item)) {
    openItems.value = openItems.value.filter((i: any) => i !== item);
  } else {
    openItems.value.push(item)
  }
};

const updateTree = (newTree: any) => {
  arr.value = newTree;
};


</script>

<template>
    <div>Test Page</div>
    <tree :key="k" :data="arr" :depth="0" :openItems="openItems" @toggle-item="handleToggle" @update-tree="updateTree"/>
    <router-link to="/">Home Page</router-link>

</template>