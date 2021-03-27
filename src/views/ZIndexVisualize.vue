<template>
  <div class="flex flex-wrap">
    <select
      v-for="(box, i) in boxList"
      :key="i"
      v-model.number="box.zIndex"
      class="ml-10"
    >
      <option value="0">Z-index: 0</option>
      <option value="10">Z-index: 10</option>
      <option value="20">Z-index: 20</option>
      <option value="30">Z-index: 30</option>
      <option value="40">Z-index: 40</option>
      <option value="50">Z-index: 50</option>
    </select>
    <input v-model.number="degree" class="ml-10" type="range" min="0" max="180">
  </div>
  <div class="demo">
    <div
      v-for="(box, i) in boxList"
      :key="i"
      :class="`box box--${i + 1} z-${box.zIndex}`"
      :style="{ transform: `translateX(${box.left}%) translateY(${box.top}%) rotateY(${degree}deg)` }"></div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const boxList = reactive([
      { zIndex: 0, top: 20, left: 0 },
      { zIndex: 0, top: 50, left: 70 },
      { zIndex: 0, top: 70, left: 140 }
    ])
    const degree = ref(0)

    return {
      boxList,
      degree
    }
  }
})
</script>

<style>
.box {
  @apply w-100 h-100 rounded-lg shadow-xl absolute;
}
.box--1 {
  @apply bg-red-500 bg-opacity-90;
}
.box--2 {
  @apply bg-green-500 bg-opacity-90;
}
.box--3 {
  @apply bg-blue-500 bg-opacity-90;
}
.z-0 {
  @apply z-0
}
.z-10 {
  @apply z-10
}
.z-20 {
  @apply z-20
}
.z-30 {
  @apply z-30
}
.z-40 {
  @apply z-40
}
.z-50 {
  @apply z-50
}
</style>
