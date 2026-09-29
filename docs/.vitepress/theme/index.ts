import DefaultTheme from 'vitepress/theme'
import { h, markRaw } from 'vue'
import TypedHome from './components/TypedHome.vue'
import LoadingBar from './components/LoadingBar.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 供 markdown 中直接使用 <TypedHome />（首页内容组件）
    app.component('TypedHome', markRaw(TypedHome))
  },
  Layout() {
    // 使用官方 layout-top 插槽挂载加载进度条，不额外包裹外层节点，
    // 避免干扰 VitePress 根节点结构导致 hydration 报错。
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(LoadingBar),
    })
  },
}