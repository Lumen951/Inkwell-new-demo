<h1 align="center">Inkwell IDE</h1>

<p align="center">书心Inkwell IDE,解放大脑,专注内容</p>

原开源IDE代码仓库：https://github.com/codefuse-ai/codefuse-ide
非常感谢原作者，为我们几位没有学习过前端的同学提供了实现自己想法的平台🙏🙏🙏


# 为什么制作书心？
书心Inkwell IDE为作者在北大新青年极客松和几位同学共同碰撞得到的想法
起因是我们都是多平台创作者，深受多窗口编辑&格式切换所困扰
于是我们想要将AI嵌入IDE，免受多窗口编辑之苦
同时希望能够接入VSCode插件库的IDE，以解决不同格式编辑的需求

我们都是Obsidian，Notion，VSCode，Cursor的深度用户，前后在不同笔记软件敲下几十万字
请相信我们，我们或许不懂太多前端代码，但我们懂文字创作，懂文字创作者

> 另外，如果有任何bug，非常欢迎反映，这毕竟是一个三天学习+制作出的demo，必然会存在大量bug，但我们希望和诸位创作者共同完善它

# 书心为谁制作？
我们为深度内容创作者制作书心IDE，如果你是：
1. 自媒体创作者（尤其是多平台创作者）
2. 小说作者
3. 科研工作者
4. ……
不妨体验一下书心Inkwell IDE

# 书心添加的功能
简短的说，书心就是Cursor的写作版，我们添加或修改了一下功能：
1. Ctrl+K 编辑框内调用对话框，输入要求与GPT对话创作
2. 预置润色，翻译，总结，扩写提示词，提供一键式内容修改
3. 侧边栏查询提供创意灵感，保证创作连续性
4. 此外，可以使用编辑框转换格式或者风格
书心，助你舒心创作

# 源代码启动方法

```bash
yarn

yarn run electron-rebuild

yarn run start
```
可能出现的报错：
1. `yarn`没有配置环境变量：找到文件夹下yarn的bin文件夹，添加进入环境变量
2. `yarn`存在某个库安装不上：下载Visual Studio，并配置相关库+补丁库


