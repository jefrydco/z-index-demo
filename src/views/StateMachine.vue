<template>
  <div class="flex flex-wrap justify-center mb-10">
    <div
      v-for="(screen, i) in screenList"
      :key="i"
      class="flex flex-col"
    >
      <button
        class="btn btn--blue"
        :class="{ 'btn--active': screen.value === fsmState }"
      >
        {{ screen.text }}
      </button>
      <button
        v-for="(action, j) in screen.actionList"
        :key="j"
        class="btn btn--yellow btn--rounded"
        @click="fsmService.send(action)"
      >
        {{ action }}
      </button>
    </div>
  </div>
  <div class="flex flex-wrap justify-center">
    <div
      class="box"
      :style="boxStyle"
      @click="handleClick"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, CSSProperties } from 'vue'
import { createMachine, interpret } from '@xstate/fsm'

import LoadingScreen from '../assets/screen/loading.png'
import ProgressScreen from '../assets/screen/progress.png'
import QuizzScreen from '../assets/screen/quizz.png'
import ResultScreen from '../assets/screen/result.png'
import TaptapScreen from '../assets/screen/taptap.png'

function useFsmService() {
  const machine = createMachine({
      id: 'screen',
      initial: 'taptap',
      states: {
        init: {
          on: {
            LOADING: 'loading'
          }
        },
        loading: {
          on: {
            LOADING: 'loading',
            INIT: 'init',
            TAPTAP: 'taptap',
            QUIZZ: 'quizz',
            PROGRESS: 'progress',
            RESULT: 'result',
            LEADERBOARD: 'leaderboard',
            HELPME: 'helpme',
            ERROR: 'error'
          }
        },
        taptap: {
          on: {
            LOADING: 'loading'
          }
        },
        quizz: {
          on: {
            LOADING: 'loading'
          }
        },
        progress: {
          on: {
            LOADING: 'loading'
          }
        },
        result: {
          on: {
            LOADING: 'loading'
          }
        },
        helpme: {
          on: {
            LOADING: 'loading'
          }
        },
        leaderboard: {
          on: {
            LOADING: 'loading'
          }
        },
        error: {
          on: {
            LOADING: 'loading'
          }
        }
      }
    })
  return interpret(machine).start()
}

export default defineComponent({
  setup() {
    const fsmState = ref('taptap')
    const screenState = reactive({
      init: ProgressScreen,
      loading: LoadingScreen,
      quizz: QuizzScreen,
      result: ResultScreen,
      taptap: TaptapScreen
    }) as Record<string, string>
    const screenList = reactive([
      { text: 'Init', value: 'init', actionList: ['LOADING'] },
      { text: 'Loading', value: 'loading', actionList: ['LOADING', 'QUIZZ', 'RESULT', 'TAPTAP'] },
      { text: 'Quizz', value: 'quizz', actionList: ['LOADING'] },
      { text: 'Result', value: 'result', actionList: ['LOADING'] },
      { text: 'Taptap', value: 'taptap', actionList: ['LOADING'] }
    ])
    const fsmService = reactive(useFsmService())

    fsmService.subscribe((state) => {
      console.info(`[FSM]: ${state.value}`)
      fsmState.value = state.value
    })

    const boxStyle = computed(() => ({
      'background-image': `url(${screenState[fsmState.value]})`
    })) as CSSProperties

    function handleClick() {
      switch (fsmState.value) {
        case 'taptap':
          fsmService.send('LOADING')
          setTimeout(() => {
            fsmService.send('QUIZZ')
          }, 1000)
          break
        case 'quizz':
          fsmService.send('LOADING')
          setTimeout(() => {
            fsmService.send('INIT')
            setTimeout(() => {
              fsmService.send('LOADING')
              setTimeout(() => {
                fsmService.send('RESULT')
              }, 1000)
            }, 3000)
          }, 1000)
          break
        case 'result':
          fsmService.send('LOADING')
          setTimeout(() => {
            fsmService.send('TAPTAP')
          }, 1000)
          break
        default:
          break;
      }
    }

    return {
      fsmState,
      screenState,
      boxStyle,
      screenList,
      fsmService,
      handleClick
    }
  },
})
</script>


<style>
.box {
  @apply w-72 h-128 bg-blue-500 bg-opacity-50 bg-no-repeat bg-contain relative;
  background-image: url('../assets/screen/progress.png');
}

.btn {
  @apply py-2 px-4 font-semibold rounded shadow-md ml-10 mt-10 text-white;

  &--blue {
    @apply bg-blue-500;
  }

  &--yellow {
    @apply bg-yellow-500
  }

  &--rounded {
    @apply rounded-2xl
  }

  &--active {
    @apply bg-green-500;
  }
}
</style>
