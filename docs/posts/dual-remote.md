---
title: GitHub 与 Gitee 双仓库同步
description: 同一项目如何同时推送到 GitHub 和 Gitee，一次提交、两处更新。
---
# GitHub 与 Gitee 双仓库同步

很多开源项目会同时维护 **GitHub**（国际访问）和 **Gitee**（国内访问更快）。这里记录我让一个本地仓库同时推送到两个远端的方法。

## 方案：一个本地仓库挂两个 remote

最常用的是给本地仓库添加多个远端，推送时指定目标：

```bash
# 添加 Gitee 作为第二个远端
git remote add gitee https://gitee.com/UserName/repo.git

# 查看当前远端
git remote -v
```

推送时分别推：

```bash
git push origin main
git push gitee main
```

## 更省事：用 git pushurl 一次推两处

把 `origin` 配置成「推送时发往两个地址」，这样只需要一次 `git push origin main`：

```bash
git remote set-url --add --push origin https://github.com/UserName/repo.git
git remote set-url --add --push origin https://gitee.com/UserName/repo.git
```

之后 `git push origin main` 就会同时推到 GitHub 和 Gitee。

## 注意事项

- **只做镜像 / 多平台发布**时适合这么改；若两平台分开演进，还是用「各自独立 remote」更清晰。
- README 里的截图、图片相对路径如果依赖平台加速，可能要额外处理。
- 刚在 Gitee 建的空仓库直接 `push -u` 有时因远端 branch 状态报错，先 `git push gitee main` 本地再关联即可。

## 小结

双仓同步本质就是「多个 remote」，关键是要分清「推送时都要发」和「分开发」两种需求。个人项目用第二条 `pushurl` 方案最省操作。