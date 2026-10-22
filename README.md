# 网页玩具铺 🎪

灵感来自 [neal.fun](https://neal.fun) 的迷你中文版：不用登录、不用下载，点开就玩。

线上地址：**https://nore1030.github.io/web-toys/**

## 玩具清单

| 玩具 | 玩法 |
| --- | --- |
| [花光一千亿](https://nore1030.github.io/web-toys/spend/) | 一千亿美元预算，从冰淇淋买到登月计划，看你怎么败光 |
| [深海下潜](https://nore1030.github.io/web-toys/deepsea/) | 往下滚就是往海底潜，一路滚到 10935 米的挑战者深渊 |
| [荒谬电车难题](https://nore1030.github.io/web-toys/trolley/) | 25 道电车难题，一道比一道离谱，通关有战绩结算 |
| [密码地狱](https://nore1030.github.io/web-toys/password/) | 设个密码而已，规则却不断加码：数字和=25、赞助商、验证码、生肖…… |
| [成语猜猜](https://nore1030.github.io/web-toys/idiom/) | 中文版 Wordle，6 次机会猜成语；每日一题全网同题，另有无尽模式 |
| [引力沙盒](https://nore1030.github.io/web-toys/gravity/) | 点击放置引力源，粒子自动绕轨成星云，解压无目的 |

## 技术说明

纯静态站点：每个玩具一个独立的 `index.html`，CSS/JS 全部内联，无框架、无依赖、无后端。
部署在 GitHub Pages（`main` 分支根目录）。

## 本地运行

```bash
python3 -m http.server 8932
# 打开 http://127.0.0.1:8932/
```
