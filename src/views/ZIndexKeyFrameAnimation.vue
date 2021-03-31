<template>
  <div class="flex flex-wrap justify-center">
    <div
      v-for="(object, i) in objectList"
      :key="i"
      class="bg-blue-200 w-70 p-3 rounded shadow ml-10 mt-10"
    >
      <h2 class="text-center mb-3 font-semibold">
        {{ object.text }}
      </h2>
      <div class="flex flex-wrap justify-center mb-3">
        <div>Slow</div>
        <input v-model.number="object.speed" class="mx-5" type="range" min="1" max="30">
        <div>Fast</div>
      </div>
      <select
        v-model.number="object.zIndex"
      >
        <option value="0">z-index: 0</option>
        <option value="10">z-index: 10</option>
        <option value="20">z-index: 20</option>
        <option value="30">z-index: 30</option>
        <option value="40">z-index: 40</option>
        <option value="50">z-index: 50</option>
      </select>
    </div>
  </div>
  <div class="flex justify-center mt-10">
    <input id="overlay" type="checkbox" v-model="isOverlayDisplayed" class="mt-1">
    <label class="ml-3" for="overlay">Overlay</label>
  </div>
  <div
    class="viewport flex flex-wrap justify-center mt-10"
    :class="{ 'viewport--overlay': isOverlayDisplayed }"
  >
    <div class="box">
      <img
        v-for="(object, i) in objectList"
        :key="i"
        :src="object.image"
        :alt="object.text"
        :class="object.class"
        :style="{
          'animation-duration': `${20 / object.speed}s`,
          'z-index': object.zIndex
        }"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue'
import cloudNoon from '../assets/cloud-noon.svg'
import cloudAfternoon from '../assets/cloud-afternoon.svg'
import mosque from '../assets/mosque.svg'
import person from '../assets/man.svg'

export default defineComponent({
  setup() {
    const speed = ref(1)
    const animationSpeed = computed(() => ({
      'animation-duration': `${20 / speed.value}s`
    }))
    const objectList = reactive([
      {
        text: 'Cloud Blue',
        class: 'cloud cloud--1',
        speed: 0,
        zIndex: 10,
        animate: true,
        image: cloudNoon
      },
      {
        text: 'Cloud Orange',
        class: 'cloud cloud--2',
        speed: 0,
        zIndex: 10,
        animate: true,
        image: cloudAfternoon
      },
      {
        text: 'Mosque',
        class: 'mosque',
        speed: 0,
        zIndex: 10,
        animate: true,
        image: mosque
      },
      {
        text: 'Person',
        class: 'person',
        speed: 0,
        zIndex: 10,
        animate: true,
        image: person
      }
    ])
    const isOverlayDisplayed = ref(false)

    return {
      speed,
      animationSpeed,
      objectList,
      isOverlayDisplayed
    }
  },
})
</script>

<style>
.box {
  @apply w-90 h-128 bg-blue-500 bg-opacity-50 bg-no-repeat bg-contain relative;
  background-image: url('../assets/background-empty-noon.png');
}

.viewport--overlay {
  @apply relative;
}

.viewport--overlay::before, .viewport--overlay::after {
  @apply absolute w-90 h-128 bg-indigo-100;
  z-index: 999;
  content: '';
}

.viewport--overlay::before {
  left: calc(50% - 540px);
}

.viewport--overlay::after {
  right: calc(50% - 540px);
}

.person {
  @apply w-25 absolute bottom-10 left-5;
  animation: person-up-downs linear infinite;
}

.mosque {
  @apply w-50 absolute bottom-27 left-20;
}

.cloud {
  @apply absolute top-0;
}

.cloud, .mosque {
  animation: run-left linear infinite
}

@keyframes run-left {
  from {
    transform: translate3d(360px, 0, 0)
  }
  to {
    transform: translate3d(-360px, 0, 0)
  }
}

@keyframes person-up-downs {
  0% {
    transform: translate3d(0, 0, 0) rotate(-1deg)
  }
  20% {
    transform: translate3d(0, -10px, 0)
  }
  40% {
    transform: translate3d(0, 0, 0) rotate(1deg)
  }
  60% {
    transform: translate3d(0, 10px, 0)
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(-1deg)
  }
}
</style>
