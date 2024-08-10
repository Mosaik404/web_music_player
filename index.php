<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>|⠀音乐播放器 v.2.10⠀|</title>
    <link rel="stylesheet" href="./mediaelementplayer.min.css">
    <link rel="stylesheet" href="main.css">
	<!--link rel="stylesheet" href="equalizer.css"-->
</head>
<body>
<div class="main_container">
    <div id="overlay"> <!--背景遮罩-->
        <h1>音乐播放器 v.2.10</h1>
        <div id="player-container">
            <!--img id="cover" src="" alt="封面"-->
            <div id="track-info">
                <a style="color:#ff7800bb;">当前播放</a>
                <span><a style="color:#ff7800bb;">▶</a></span>
                <span id="trackName" style="">无</span>
            </div>
            <audio id="player1" controls>
                <source src="" type="audio/mpeg"> <!-- 对应 MP3 格式 -->
                <source src="" type="audio/aac"> <!-- 对应 AAC 格式 -->
                <source src="" type="audio/mp4"> <!-- 对应 M4A 格式 -->
                <source src="" type="audio/ogg"> <!-- 对应 OGG 格式 -->
                您的浏览器不支持 audio 元素。
            </audio>
            <div class="controls">
                <button id="prevBtn">◀‖ 上一曲</button>
                <button id="nextBtn">下一曲 ‖▶</button>
            </div>
            <button id="autoNextToggle" class="disabled">开启自动下一曲(当前为关闭)</button>
            <button id="loopToggle" class="disabled">开启单曲循环(当前为关闭)</button>
            <button id="shuffleToggle" class="disabled">开启随机播放(当前为关闭)</button>
        </div>

        <div id="playlist-container">
            <ul id="playlist">
                <?php
                $directory = './Musics'; // 替换为你的音频文件目录
                $extensions = ['mp3', 'aac', 'm4a', 'ogg']; // 你支持的音频文件类型

                $files = [];
                foreach (glob("$directory/*") as $file) {
                    $fileParts = pathinfo($file);
                    if (in_array(strtolower($fileParts['extension']), $extensions)) {
                        $files[] = $fileParts['basename'];
                    }
                }

                foreach ($files as $file) {
                    echo "<li data-src='./Musics/$file'>$file</li>";
                }
                ?>
            </ul>
        </div>
    </div>

    <div id="tips">
        <div class="tip-box">
            <h3 style="line-height: 0px;">提示</h3>
            <p>使用 <a style="font-weight:bold;">Ctrl+F(桌面端)</a> 或 <a style="font-weight:bold;">“搜索页面内容”(移动端)</a> 来查找你想要的歌曲。</p>
            <a style="font-weight: bold;">bug反馈请发：<a href="mailto:admin@mail.litmustea.eu.org" style="color:#ff7800cc;font-weight:bold;">admin@mail.litmustea.eu.org</a> 或 <a href="https://github.com/Mosaik404/web_music_player/issues" style="color:#ff7800cc;font-weight:bold;">提 issue</a></a><br/>
            <a>Created by Chat GPT 4o🤩</a>
            <p style="font-size: 10px; line-height: 12px;">
			<a>v.2.10：添加键盘控制：↕音量，↔上下曲，空格暂停、通过Media Session API支持移动端后台播放控件和桌面端功能键、触摸板手势；优化随机播放逻辑，修复打开随机播放时重新播放当前歌曲的问题；更换思路，史诗级地解决overlay白底长度问题：由原来单独的一个方块改成背景色来实现(我是个××)；添加了页面图标；优化UI；背景图片更换为bing每日壁纸<del>(防止闪眼)</del></a><br/>
            <a>Web Music Player 是一个从 2024-07-28 开始开发的项目。</a><br/>
			<a href="https://github.com/Mosaik404/web_music_player" style="color:#ff7800cc; font-size:14px; font-weight:bold;">前往 Github 查看</a>
			</p>
		</div>
    </div>
</div>

    <script src="./mediaelement-and-player.min.js"></script>
	
	<script>
	let playlist = <?php
    $directory = './Musics'; // 替换为你的音频文件目录
    $extensions = ['mp3', 'aac', 'm4a', 'ogg']; // 你支持的音频文件类型

    $files = [];
    foreach (glob("$directory/*") as $file) {
        $fileParts = pathinfo($file);
        if (in_array(strtolower($fileParts['extension']), $extensions)) {
            $files[] = $fileParts['basename'];
        }
    }

    echo json_encode($files, JSON_PRETTY_PRINT);
	?>;
	</script>
	
	<script> <!--标题滚动效果-->
	var timerId
	function newtext() {
	var text=document.title
    clearTimeout(timerId)                  
    document.title=text.substring(3,text.length)+text.substring(0,3)
    text=document.title.substring(0,text.length)
    timerId = setTimeout("newtext()", 2000)
	}
	newtext();
	</script>

    <script src="player.js"></script>
	<!--script src="equalizer.js"></script-->
</body>
</html>
