# Web Music Player

## v.2.10更新信息🥳


1.添加键盘控制：↕音量，↔上下曲，空格暂停；<br />
2.通过Media Session API支持移动端后台播放控件和桌面端功能键、定制的触摸板手势等；<br />
3.优化随机播放逻辑，修复打开随机播放时重新播放当前歌曲的问题；<br />
4.更换思路，史诗级地(大嘘)解决overlay白底长度问题：由原来单独的一个方块改成背景色来实现(我是个××😭)；<br />
5.添加了页面图标、优化UI；<br />
6.背景图片更换为bing每日壁纸(~~防止闪眼)~~。<br />

## 简介

一个简易的Web音乐播放器。<br />

## 细节

由 PHP + JS + CSS 构成。<br />
index.php 内部的 HTML 部分用于构建页面；PHP部分用于检索同目录下Music文件夹下内音频文件（MP3、M4A、AAC、OGG），并以此在页面上生成歌单部分。<br />
player.js 主要用于实现 “上一曲” “下一曲” “自动下一曲” “单曲循环” “随机播放” 按钮的功能。还用于更改页面信息、更改标题为当前正在播放的歌曲文件名。<br />
内嵌的 JS 用于连接 PHP 和 JS；实现页面标题滚动效果。<br />
外链的 mediaelement-and-player.min.js 为播放器本体。<br />
main.css 用于构建页面格式。背景图片使用bing壁纸API实现随机图片。<br />
mediaelementplayer.min.css 用于构建播放器格式。其本身为外链（[链接](https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.16/mediaelementplayer.min.css )），在此对其做了一定的更改，所以此处为本地格式。<br />

## 部署

需要 PHP 环境。<br />
①将源代码或Release中的压缩包解压至网站根目录下；<br />
②将音乐文件放在Musics文件夹内；<br />
③访问index.php。<br />

## 备注

主要由 ChatGPT 4o 完成构建。<br />【注意】[展示页面](https://github_demo.litmustea.eu.org/web_music_player/index.php)  所用音乐均为无版权音乐。<br />

![部署效果演示图片](https://github.com/Mosaik404/web_music_player/blob/main/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-08-08%20014334.png)
