<template>
  <div class="flex flex-wrap">
    <button class="btn">
      Without Transition
    </button>
    <button class="btn btn--transition transition-colors">
      With Transition
    </button>
  </div>
</template>

<style>
.btn {
  @apply py-2 px-4 font-semibold rounded shadow-md ml-10 mt-10 text-white bg-blue-500 hover:bg-green-500;

  &--transition {
    transition-duration: .5s;
  }
}
</style>
