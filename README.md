# 网页玩具铺 🎪

灵感来自 [neal.fun](https://neal.fun) 和「工具猎人」的玩具安利，做的迷你中文合集：不用登录、不用下载，点开就玩。

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
| [盯着狗看](https://nore1030.github.io/web-toys/dog/) | 一只狗 + 一个计时器，记录你盯着它看了多久 |
| [鼠标特效游乐场](https://nore1030.github.io/web-toys/cursor/) | 彩虹拖尾、表情雨、雪花、泡泡、萤火虫，五种特效随便切 |
| [二进制钢琴](https://nore1030.github.io/web-toys/piano/) | 用 0 和 1 弹钢琴：每三位二进制奏出一个音符 |
| [油画乱涂](https://nore1030.github.io/web-toys/oil/) | 油彩飞溅的抽象画板，画完可保存 PNG |
| [中指翻转器](https://nore1030.github.io/web-toys/finger/) | 一只很乖的像素手，点一下就翻脸并戴上墨镜 |
| [玉米热狗雨](https://nore1030.github.io/web-toys/corndog/) | 玉米热狗从天而降的催眠动态壁纸 |
| [蒙德里安艺术机](https://nore1030.github.io/web-toys/mondrian/) | 一键生成红黄蓝几何抽象画，点色块换色，可保存 |
| [疯狂小虫子](https://nore1030.github.io/web-toys/worm/) | 追鼠标的小虫，晃得越猛越疯（有闪烁警告） |
| [单格扫雷](https://nore1030.github.io/web-toys/mines/) | 唯一一款你永远能赢的扫雷 |
| [打工赚钱时钟](https://nore1030.github.io/web-toys/work/) | 输入月薪，实时看今天赚了多少（很少），可假装加班 |
| [反应能力测试](https://nore1030.github.io/web-toys/reaction/) | 变绿就点，测你的反应是闪电还是树懒 |
| [数字雨](https://nore1030.github.io/web-toys/matrix/) | 黑客帝国字符瀑布，四配色可调速 |
| [画圆挑战](https://nore1030.github.io/web-toys/circle/) | 徒手画个圆，机器给圆度打分 |
| [万花尺](https://nore1030.github.io/web-toys/spiro/) | 调参数转出数学之花，可保存 PNG |
| [打砖块](https://nore1030.github.io/web-toys/breakout/) | 经典弹球打砖块，鼠标/触屏都能玩 |
| [16 型性格测试](https://nore1030.github.io/web-toys/mbti/) | 28 道原创题测出你的 16 型人格，附专属玩具推荐 |
| [极简数独](https://nore1030.github.io/web-toys/sudoku/) | 三档难度、每局唯一解，计时 + 提示 + 本机最佳 |

## 技术说明

纯静态站点：每个玩具一个独立的 `index.html`，CSS/JS 全部内联，无框架、无依赖、无后端。
部署在 GitHub Pages（`main` 分支根目录）。

## 本地运行

```bash
python3 -m http.server 8932
# 打开 http://127.0.0.1:8932/
```
