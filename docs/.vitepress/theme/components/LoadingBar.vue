<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
const progress = ref(0)
const visible = ref(false)
const settled = ref(false)

let timer = null
let finishTimer = null
let stopWatch = null

function tick() {
  // 缓慢逼近 90%，模拟加载进度
  progress.value += (90 - progress.value) * 0.12 + 1
  if (progress.value >= 90) progress.value = 90
}

function start() {
  clearTimeout(finishTimer)
  visible.value = true
  settled.value = false
  progress.value = 12
  clearInterval(timer)
  timer = setInterval(tick, 90)
}

function finish() {
  settled.value = true
  progress.value = 100
  clearInterval(timer)
  clearTimeout(finishTimer)
  finishTimer = setTimeout(() => {
    visible.value = false
    progress.value = 0
  }, 400)
}

// 路由路径变化时：先推进度条，再收尾（给人“正在加载”的反馈）
onMounted(() => {
  const { route } = useData()
  stopWatch = watch(() => route.path, () => {
    start()
    setTimeout(finish, 360)
  })
})

onUnmounted(() => {
  clearInterval(timer)
  clearTimeout(finishTimer)
  if (stopWatch) stopWatch()
})
</script>

<template>
  <Transition name="bar">
    <div v-show="visible" class="vp-loading-bar" :class="{ settled }">
      <div class="bar-fill" :style="{ width: progress + '%' }" />
    </div>
  </Transition>
</template>

<style>
.vp-loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 9999;
  pointer-events: none;
}
.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #5b8cff, #7c6cff, #3ddc84);
  background-size: 200% 100%;
  animation: barShift 1.2s linear infinite;
  transition: width .18s ease;
  box-shadow: 0 0 8px rgba(91, 140, 255, .7);
}
.vp-loading-bar.settled .bar-fill {
  animation: none;
  background: linear-gradient(90deg, #3ddc84, #2bbf78);
}
@keyframes barShift {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}
.bar-enter-active, .bar-leave-active {
  transition: opacity .3s;
}
.bar-enter-from, .bar-leave-to { opacity: 0; }
</style>