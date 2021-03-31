<template>
  <div class="flex flex-wrap ml-10">
    <div>Slow</div>
    <input v-model.number="speed" class="mx-5" type="range" min="1" max="30">
    <div>Fast</div>
  </div>
  <img
    src="../assets/man.svg"
    alt="man"
    class="man"
    :style="animationSpeed"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const speed = ref(1)
    const animationSpeed = computed(() => ({
      'animation-duration': `${20 / speed.value}s`
    }))

    return {
      speed,
      animationSpeed
    }
  },
})
</script>

<style>
.man {
  animation: run linear infinite;
}

@keyframes run {
  from {
    transform: translate3d(-100vw, 0, 0)
  }
  to {
    transform: translate3d(100vw, 0, 0)
  }
}
</style>