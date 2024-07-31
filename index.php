<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>音乐播放器 v.2.8</title>
    <link rel="stylesheet" href="./mediaelementplayer.min.css">
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <div id="overlay"></div> <!--背景遮罩-->
    <h1>音乐播放器 v.2.8</h1>
    <div id="player-container">
        <!--img id="cover" src="" alt="封面"-->
        <div id="track-info">当前播放: <span id="trackName">无</span></div>
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

    <div id="tips">
        <div class="tip-box">
            <h3 style="line-height: 0px;">提示</h3>
            <p>使用 <a style="font-weight:bold;">Ctrl+F(桌面端)</a> 或 <a style="font-weight:bold;">“搜索页面内容”(移动端)</a> 来查找你想要的歌曲。</p>
            <a style="font-weight: bold;">bug反馈请发：<a href="mailto:admin@mail.litmustea.eu.org" style="color:#ff7800cc;font-weight:bold;">admin@mail.litmustea.eu.org</a> 或 <a href="https://github.com/Mosaik404/web_music_player/issues" style="color:#ff7800cc;font-weight:bold;">提 issue</a></a><br/>
            <a>Created by Chat GPT 4o🤩</a>
            <p style="font-size: 10px; line-height: 10px;">
			<a>v.2.8：大幅优化UI和配色、优化移动端UI和配色、修改按钮逻辑、网页标题滚动效果、选中字体背景颜色😋</a><br/>
			<a>注销封面(注销：HTML & 链接外源PHP)</a>
			</p>
			<a href="https://github.com/Mosaik404/web_music_player">前往 Github 查看</a>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.16/mediaelement-and-player.min.js"></script>
	
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
    document.title=text.substring(1,text.length)+text.substring(0,1)
    text=document.title.substring(0,text.length)
    timerId = setTimeout("newtext()", 1000)
	}
	newtext();
	</script>
	
    <script src="player.js"></script>
</body>
</html>
