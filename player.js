let currentTrackIndex = 0;
let autoNextEnabled = false; // 默认关闭自动下一曲
let loopEnabled = false; // 默认关闭单曲循环
let shuffleEnabled = false; // 默认关闭随机播放
let originalPlaylist = [...playlist]; // 保存原始播放列表
let shuffledPlaylist = []; // 保存随机播放列表

// 更新当前播放曲目信息
function updateTrackInfo() {
    const trackName = playlist[currentTrackIndex];
    document.getElementById('trackName').innerText = trackName;
    // 更新页面标题
    document.title = trackName;
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
            document.querySelectorAll('#playlist li').forEach((item, idx) => {
                item.classList.toggle('selected', idx === index); // 高亮显示当前曲目
            });
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
            }
        });

        document.getElementById('nextBtn').addEventListener('click', function() {
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
            } else {
                // 关闭随机播放，恢复原始播放列表
                playlist = originalPlaylist;
            }
            currentTrackIndex = 0; // 从头开始播放
            loadTrack(currentTrackIndex);
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
    }
});
