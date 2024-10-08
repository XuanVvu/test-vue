<script setup>
import { ref } from 'vue'

const box1 = ref(['Item 1', 'Item 2', 'Item 3'])
const box2 = ref(['Item A', 'Item B', 'Item C'])
let draggedItem = ref(null)
let draggedFrom = ref(null)
let draggedIndex = ref(null)

const onDragStart = (item, index, from) => {
  draggedItem.value = item
  draggedFrom.value = from
  draggedIndex.value = index
}

const onDragOver = (event, to) => {
  event.preventDefault()
}

const onDrop = (event, to) => {
  event.preventDefault()

  if (draggedFrom.value === to) return

  const newIndex = findDropIndex(event, to)
  console.log(newIndex);
  
  
  // Xóa item từ box cũ
  if (draggedFrom.value === 'box1') {
    box1.value.splice(draggedIndex.value, 1)
  } else {
    box2.value.splice(draggedIndex.value, 1)
  }

  // Chèn item vào vị trí mới
  if (to === 'box1') {
    box1.value.splice(newIndex, 0, draggedItem.value)
  } else {
    box2.value.splice(newIndex, 0, draggedItem.value)
  }

  // Reset dragged item
  draggedItem.value = null
  draggedFrom.value = null
  draggedIndex.value = null
}

const findDropIndex = (event, box) => {
  const targetBox = event.target.closest('.box')
  const items = targetBox.querySelectorAll('.item')
  let newIndex = items.length

  items.forEach((item, index) => {
    const rect = item.getBoundingClientRect()
    const middleY = rect.top + rect.height / 2

    if (event.clientY < middleY) {
      newIndex = index
      return
    }
  })

  return newIndex

}
</script>
<template>
    <div class="container">
    <div class="box" @dragover.prevent="onDragOver($event, 'box1')" @drop="onDrop($event, 'box1')">
      <h3>Box 1</h3>
      <div
        v-for="(item, index) in box1"
        :key="index"
        class="item"
        draggable="true"
        @dragstart="onDragStart(item, index, 'box1')"
      >
        {{ item }}
      </div>
    </div>

    <div class="box" @dragover.prevent="onDragOver($event, 'box1')" @drop="onDrop($event, 'box2')">
      <h3>Box 2</h3>
      <div
        v-for="(item, index) in box2"
        :key="index"
        class="item"
        draggable="true"
        @dragstart="onDragStart(item, index, 'box2')"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.box {
  width: 200px;
  height: 300px;
  border: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
}

.item {
  padding: 8px;
  margin: 5px 0;
  background-color: #f0f0f0;
  cursor: grab;
}
</style>