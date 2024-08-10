let currentTrackIndex = 0;
let autoNextEnabled = true; // 默认开启自动下一曲
let loopEnabled = false; // 默认关闭单曲循环
let shuffleEnabled = false; // 默认关闭随机播放
let originalPlaylist = [...playlist]; // 保存原始播放列表
let shuffledPlaylist = []; // 保存随机播放列表

// 更改 overlay 高度
/*function changeOverlayHeight() {
    const trackName = document.getElementById('trackName');
    const overlay = document.getElementById('overlay');
    // 获取计算后的样式
    const computedTrackName = window.getComputedStyle(trackName);
    const computedOverlay = window.getComputedStyle(overlay);
    // 获取实际的高度和行高
    var trackNameHeight = parseFloat(computedTrackName.height);
    var overlayOriginalHeight = 615;
    // 计算新的高度
    var overlayNewHeight = overlayOriginalHeight + trackNameHeight - 25; // -25是为了完全减去trackName的高度以便重新计算
    // 设置新的高度
    overlay.style.height = `${overlayNewHeight}px`;
}留着这个铭记我在这干了什么闹谈的事情*/

// 更新当前播放曲目信息
function updateTrackInfo() {
    const trackName = playlist[currentTrackIndex];
    // 修改呈现的HTML页面标题（me）
    const trackNamefortitle = trackName + "⠀||⠀▶";
    document.getElementById('trackName').innerText = trackName;
    // 更新页面标题
    document.title = trackNamefortitle;
    // 更新播放列表中高亮显示的歌曲
    document.querySelectorAll('#playlist li').forEach((item, idx) => {
        item.classList.toggle('selected', shuffleEnabled ? shuffledPlaylist[currentTrackIndex] === item.dataset.src.split('/').pop() : idx === currentTrackIndex);
    });
	// 添加 Media Session API 的支持
        if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: playlist[currentTrackIndex],
            //artist: 'Your Artist Name', // Optional
            //album: 'Your Album Name', // Optional
            //artwork: [{ src: './favico.ico', sizes: '512x512', type: 'image/jpeg' }] // Optional
        });

        navigator.mediaSession.setActionHandler('previoustrack', function() {
            document.getElementById('prevBtn').click(); // 触发上一曲按钮的点击事件
        });

        navigator.mediaSession.setActionHandler('nexttrack', function() {
            document.getElementById('nextBtn').click(); // 触发下一曲按钮的点击事件
        });

        /*navigator.mediaSession.setActionHandler('play', function() {
            if (mediaElement.paused) {
                mediaElement.play();
            }
        });

        navigator.mediaSession.setActionHandler('pause', function() {
            if (!mediaElement.paused) {
                mediaElement.pause();
            }
        });*/	//注销，否则影响暂停的API
    }
}

// 随机打乱数组
function shuffleArray(array) {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // 交换元素
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

const player = new MediaElementPlayer('player1', {
    success: function(mediaElement, originalNode) {
        // 加载指定曲目
        function loadTrack(index) {
            mediaElement.setSrc(`Musics/${playlist[index]}`); // 使用正确的路径
            mediaElement.load();
            mediaElement.play();
            updateTrackInfo();
        }

        // 加载下一曲目
        function loadNextTrack() {
            if (shuffleEnabled) {
                // 随机播放模式
                currentTrackIndex = Math.floor(Math.random() * playlist.length);
            } else if (autoNextEnabled) {
                // 自动下一曲模式
                currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            }
            loadTrack(currentTrackIndex);
        }

        // 播放结束事件处理
        mediaElement.addEventListener('ended', function() {
            if (loopEnabled) {
                // 单曲循环模式
                loadTrack(currentTrackIndex);
            } else if (autoNextEnabled) {
                // 自动下一曲模式
                loadNextTrack();
            } else if (!autoNextEnabled && !shuffleEnabled) {
                // 自动下一曲关闭且非随机播放模式
                // 如果是顺序播放模式，播放完毕后不自动播放下一曲
            }
        });

        document.getElementById('nextBtn').addEventListener('click', function() {
            // 下一曲
            if (shuffleEnabled) {
                // 随机播放模式
                currentTrackIndex = Math.floor(Math.random() * playlist.length);
            } else {
                // 顺序播放模式
                currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            }
            loadTrack(currentTrackIndex);
        });

        document.getElementById('prevBtn').addEventListener('click', function() {
            // 上一曲
            currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            loadTrack(currentTrackIndex);
        });

        document.getElementById('autoNextToggle').addEventListener('click', function() {
            autoNextEnabled = !autoNextEnabled;
            this.textContent = autoNextEnabled ? '关闭自动下一曲(当前为开启)' : '开启自动下一曲(当前为关闭)';
            this.classList.toggle('enabled', autoNextEnabled);
            this.classList.toggle('disabled', !autoNextEnabled);
        });

        document.getElementById('loopToggle').addEventListener('click', function() {
            loopEnabled = !loopEnabled;
            this.textContent = loopEnabled ? '关闭单曲循环(当前为开启)' : '开启单曲循环(当前为关闭)';
            this.classList.toggle('enabled', loopEnabled);
            this.classList.toggle('disabled', !loopEnabled);
        });

        document.getElementById('shuffleToggle').addEventListener('click', function() {
            shuffleEnabled = !shuffleEnabled;
            this.textContent = shuffleEnabled ? '关闭随机播放(当前为开启)' : '开启随机播放(当前为关闭)';
            this.classList.toggle('enabled', shuffleEnabled);
            this.classList.toggle('disabled', !shuffleEnabled);

            if (shuffleEnabled) {
                // 激活随机播放
                shuffledPlaylist = shuffleArray(originalPlaylist);
                playlist = shuffledPlaylist;
                currentTrackIndex = shuffledPlaylist.indexOf(originalPlaylist[currentTrackIndex]);
                if (currentTrackIndex === -1) {
                    currentTrackIndex = 0;
                }
                // 如果播放器处于暂停状态，则立即开始播放随机曲目
                if (mediaElement.paused) {
                    loadTrack(currentTrackIndex);
                }
            } else {
                // 关闭随机播放，恢复原始播放列表
                playlist = originalPlaylist;
                // 在关闭随机播放时，从当前播放的歌曲继续
                currentTrackIndex = originalPlaylist.indexOf(shuffledPlaylist[currentTrackIndex]);
                if (currentTrackIndex === -1) {
                    currentTrackIndex = 0;
                }
            }
        });

        // 处理播放列表项点击事件
        document.querySelectorAll('#playlist li').forEach(function(item, index) {
            item.addEventListener('click', function() {
                if (shuffleEnabled) {
                    // 在随机播放模式下找到对应曲目的索引
                    currentTrackIndex = shuffledPlaylist.indexOf(item.dataset.src.split('/').pop());
                } else {
                    // 在顺序播放模式下找到对应曲目的索引
                    currentTrackIndex = index;
                }
                loadTrack(currentTrackIndex);
            });
        });

        // 键盘事件监听
        document.addEventListener('keydown', function(event) {
            switch (event.code) {
                case 'MediaTrackNext': // 媒体键 下一曲
                case 'ArrowRight': // 右箭头，下一曲
                    if (shuffleEnabled) {
                        currentTrackIndex = Math.floor(Math.random() * playlist.length);
                    } else {
                        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
                    }
                    loadTrack(currentTrackIndex);
                    break;
                case 'MediaTrackPrevious': // 媒体键 上一曲
                case 'ArrowLeft': // 左箭头，上一曲
                    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
                    loadTrack(currentTrackIndex);
                    break;
                case 'ArrowUp': // 上箭头，增加音量
                    mediaElement.volume = Math.min(1, mediaElement.volume + 0.1);
                    event.preventDefault(); // 阻止页面滚动
                    break;
                case 'ArrowDown': // 下箭头，减少音量
                    mediaElement.volume = Math.max(0, mediaElement.volume - 0.1);
                    event.preventDefault(); // 阻止页面滚动
                    break;
                case 'Space': // 空格键播放/暂停
                    if (mediaElement.paused) {
                        mediaElement.play();
                    } else {
                        mediaElement.pause();
                    }
                    event.preventDefault(); // 防止页面滚动
                    break;
                default:
                    break;
            }
        });

        // 初始化时设置按钮状态
        function updateButtonStates() {
            const autoNextButton = document.getElementById('autoNextToggle');
            autoNextButton.textContent = autoNextEnabled ? '关闭自动下一曲(当前为开启)' : '开启自动下一曲(当前为关闭)';
            autoNextButton.classList.toggle('enabled', autoNextEnabled);
            autoNextButton.classList.toggle('disabled', !autoNextEnabled);
        }

        // 调用初始化函数
        updateButtonStates();

        
    }
});