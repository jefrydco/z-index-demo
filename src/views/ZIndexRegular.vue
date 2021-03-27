<template>
  <div class="flex flex-wrap">
    <select
      v-for="(box, i) in boxList"
      :key="i"
      v-model.number="box.zIndex"
      class="ml-10"
    >
      <option value="0">{{ box.color }} z-index: 0</option>
      <option value="10">{{ box.color }} z-index: 10</option>
      <option value="20">{{ box.color }} z-index: 20</option>
      <option value="30">{{ box.color }} z-index: 30</option>
      <option value="40">{{ box.color }} z-index: 40</option>
      <option value="50">{{ box.color }} z-index: 50</option>
    </select>
  </div>
  <div class="demo">
    <div
      v-for="(box, i) in boxList"
      :key="i"
      :class="`box box--${i + 1} z-${box.zIndex}`"></div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const boxList = reactive([
      { zIndex: 10, color: 'Red' },
      { zIndex: 30, color: 'Green' },
      { zIndex: 20, color: 'Blue' }
    ])

    return {
      boxList
    }
  }
})
</script>

<style>
.box {
  @apply h-100 rounded-lg shadow-xl absolute;
}
.box--1 {
  @apply w-250 bg-red-500 bg-opacity-90 top-20
}
.box--2 {
  @apply w-100 bg-green-500 bg-opacity-90 left-30 top-50
}
.box--3 {
  @apply w-100 bg-blue-500 bg-opacity-90 left-90 top-70
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
