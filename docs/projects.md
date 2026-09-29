# 作品集

## RAG 知识库问答系统

从 0 到 1 打造并**成功部署到阿里云**的全栈 AI 应用：上传个人文档构建知识库，再基于大模型进行检索增强生成（RAG）问答。

### 功能亮点

- 🔐 **登录鉴权**：JWT + MySQL 用户体系，支持注册 / 登录 / 鉴权
- 📄 **文档管理**：上传 Markdown 文档，自动切片并向量化入库
- 🔍 **语义检索**：Qdrant 向量数据库 + DashScope text-embedding-v3（1024 维）检索
- 💬 **流式问答**：基于 qwen-plus（DashScope）的 SSE 流式输出
- ☁️ **云端部署**：Ubuntu + Nginx + systemd 托管，Let's Encrypt 证书待备案后上线

### 技术栈

`Vue 3` · `TypeScript` · `Vite` · `Python` · `FastAPI/uvicorn` · `Qdrant` · `MySQL` · `DashScope` · `Nginx`

### 在线体验与源码

- 线上部署：`101.37.236.43`（80 端口，RAG 前端）
- 源码：[GitHub](https://github.com/crossmasted/rag) · [Gitee](https://gitee.com/ZhangpCheng/rag-person)
- 相关文章：[RAG 知识库从 0 到部署上线](/posts/rag-deploy)