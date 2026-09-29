import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: '张泽的博客',
  description: '前端 / 后端开发工程师的个人技术博客与作品集，记录 AI 编程与项目实践',
  cleanUrls: true,

  head: [
    // 自定义浏览器标签图标（复用头像照片）
    ['link', { rel: 'icon', type: 'image/jpeg', href: '/avatar.jpg' }],
    ['link', { rel: 'apple-touch-icon', href: '/avatar.jpg' }],
    // 站点主题强调色（accent color，覆盖 VitePress 默认紫蓝）
    ['meta', { name: 'theme-color', content: '#5b8cff' }],
  ],

  themeConfig: {
    // 站点 logo（使用 emoji，免图片资源）
    logo: '👨‍💻',

    nav: [
      { text: '首页', link: '/' },
      { text: '技术博客', link: '/posts/index' },
      { text: '作品集', link: '/projects' },
      { text: '关于我', link: '/about' },
    ],

    sidebar: {
      '/posts/': [
        {
          text: '技术博客',
          items: [
            { text: '博客总览', link: '/posts/index' },
            { text: 'RAG 知识库从 0 到部署上线', link: '/posts/rag-deploy' },
            { text: '4GB 显存下的本地 LLM 提速调优', link: '/posts/llm-4gb-tuning' },
            { text: 'GitHub 与 Gitee 双仓库同步', link: '/posts/dual-remote' },
          ],
        },
      ],
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'short', timeStyle: 'short' },
    },

    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/crossmasted/rag' },
    ],

    footer: {
      message: 'Powered by VitePress',
      copyright: 'Copyright © 2026 张泽',
    },
  },
})