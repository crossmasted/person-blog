<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 大标题「张泽」逐字打出
const nameFull = '张泽'
const revealed = ref('')
// 光标后是否在渲染文字
const caretOn = ref(true)

// 副标题轮换句子（打字 → 停顿 → 删除 → 下一句）
const lines = [
  '用代码解决问题，积极拥抱 AI 编程（vibe coding）🚀',
  '4 年前端 + 1 年后端，热衷全栈实战。',
  '从 0 到 1 打造并部署 RAG 知识库问答系统。',
  '这里是技术博客、作品集，与我的成长记录。',
]
const currentText = ref('')
const lineIndex = ref(0)
const visibleCount = ref(0)
const deleting = ref(false)

let nameTimer = null
let caretsTimer = null
let ticker = null

function startNameType() {
  let i = 0
  nameTimer = setInterval(() => {
    i++
    revealed.value = nameFull.slice(0, i)
    if (i >= nameFull.length) clearInterval(nameTimer)
  }, 220)
}

function toggleCaret() {
  caretOn.value = !caretOn.value
}

function tickLine() {
  const line = lines[lineIndex.value] || ''
  if (!deleting.value) {
    // 打字
    visibleCount.value++
    if (visibleCount.value > line.length) {
      // 打完停顿
      setTimeout(() => { deleting.value = true }, 1600)
      return
    }
  } else {
    // 删除
    visibleCount.value--
    if (visibleCount.value < 0) {
      visibleCount.value = 0
      deleting.value = false
      lineIndex.value = (lineIndex.value + 1) % lines.length
    }
  }
  currentText.value = line.slice(0, visibleCount.value)
}

onMounted(() => {
  startNameType()
  caretsTimer = setInterval(toggleCaret, 500)
  ticker = setInterval(tickLine, deleting.value ? 55 : 130)
})

onUnmounted(() => {
  clearInterval(nameTimer)
  clearInterval(caretsTimer)
  clearInterval(ticker)
})
</script>

<template>
  <div class="typed-home">
    <div class="hero-inner">
      <div class="avatar-wrap">
        <div class="avatar-glow" />
        <img class="avatar" src="/avatar.jpg" alt="张泽" />
      </div>

      <div class="title-wrap">
        <span class="typed-name">{{ revealed }}</span><span class="caret" :class="{ off: !caretOn }">▌</span>
      </div>

      <p class="typed-tagline">
        <span class="tagline-text">{{ currentText }}</span><span class="caret small" :class="{ off: !caretOn }">▍</span>
      </p>

      <div class="actions">
        <a class="action primary" href="/projects">查看作品集</a>
        <a class="action" href="/posts/index">阅读技术博客</a>
        <a class="action" href="/about">关于我</a>
      </div>

      <div class="scroll-hint">
        <span>向下滚动</span>
        <span class="chevron">∨</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.typed-home {
  min-height: 46vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 20px 40px;
  position: relative;
  overflow: hidden;
}

.hero-inner {
  text-align: center;
  max-width: 720px;
  animation: heroIn 1s ease both;
}

@keyframes heroIn {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
}

/* 头像 + 呼吸光晕 */
.avatar-wrap {
  position: relative;
  width: 128px;
  height: 128px;
  margin: 0 auto 28px;
}
.avatar {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255,255,255,.12);
  position: relative;
  z-index: 2;
  box-shadow: 0 12px 40px rgba(91,140,255,.35);
}
.avatar-glow {
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(91,140,255,.55), transparent 70%);
  z-index: 1;
  animation: breathe 3.2s ease-in-out infinite;
}
@keyframes breathe {
  0%,100% { transform: scale(1); opacity: .7; }
  50% { transform: scale(1.18); opacity: 1; }
}

.title-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.typed-name {
  font-size: 60px;
  font-weight: 800;
  line-height: 1.1;
  background: linear-gradient(120deg, #ffffff 0%, #8fb3ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 2px;
}
.caret {
  display: inline-block;
  margin-left: 6px;
  font-size: 54px;
  color: #5b8cff;
  animation: none;
  transition: opacity .1s;
}
.caret.off { opacity: 0; }
.caret.small { font-size: 30px; margin-left: 4px; }

.typed-tagline {
  min-height: 40px;
  margin-top: 18px;
  font-size: 19px;
  color: var(--vp-c-text-2, #8a92a6);
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.tagline-text { white-space: pre-wrap; }

.actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-top: 34px;
  flex-wrap: wrap;
}
.action {
  display: inline-flex;
  align-items: center;
  padding: 11px 24px;
  border-radius: 999px;
  font-size: 15px;
  color: var(--vp-c-text-2, #c9cedd);
  text-decoration: none;
  border: 1px solid rgba(128,128,128,.25);
  background: transparent;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s, color .25s;
}
.action:hover {
  transform: translateY(-2px);
}
.action.primary {
  color: #fff;
  background: linear-gradient(120deg, #5b8cff, #7c6cff);
  border-color: transparent;
  box-shadow: 0 10px 30px rgba(91,140,255,.4);
}
.action:hover { border-color: #5b8cff88; }

.scroll-hint {
  margin-top: 40px;
  font-size: 13px;
  color: var(--vp-c-text-3, #6b7280);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  opacity: .8;
}
.chevron {
  animation: bounceDown 1.6s ease-in-out infinite;
}
@keyframes bounceDown {
  0%,100% { transform: translateY(0); opacity: .6; }
  50% { transform: translateY(5px); opacity: 1; }
}

@media (max-width: 680px) {
  .typed-name { font-size: 42px; }
  .caret { font-size: 38px; }
  .avatar-wrap, .avatar { width: 100px; height: 100px; }
}
</style>