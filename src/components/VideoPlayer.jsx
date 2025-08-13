import React, { useState, useRef, useEffect } from 'react';

const VideoPlayer = () => {
    // Refs для прямого доступа к DOM-элементам
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const progressRef = useRef(null);
    const volumeRef = useRef(null);

    // Состояния компонента
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const [progress, setProgress] = useState(0);

    // --- ФОРМАТИРОВАНИЕ ВРЕМЕНИ ---
    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds)) return '0:00';
        const time = Math.floor(timeInSeconds);
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const formattedMinutes = hours > 0 ? String(minutes).padStart(2, '0') : minutes;
        const formattedSeconds = String(seconds).padStart(2, '0');

        if (hours > 0) {
            return `${hours}:${formattedMinutes}:${formattedSeconds}`;
        }
        return `${formattedMinutes}:${formattedSeconds}`;
    };
    
    // --- ОБРАБОТЧИКИ СОБЫТИЙ ВИДЕО ---
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            const percentage = (video.currentTime / video.duration) * 100 || 0;
            setProgress(percentage);
            setCurrentTime(formatTime(video.currentTime));
            
            if (video.duration) {
                const remaining = video.duration - video.currentTime;
                setDuration('-' + formatTime(remaining));
            }
        };
        
        const handleLoadedMetadata = () => {
            handleTimeUpdate(); // Инициализируем время при загрузке
        };

        const handleVolumeChange = () => {
            setVolume(video.volume);
            setIsMuted(video.muted);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('volumechange', handleVolumeChange);
        video.addEventListener('play', () => setIsPlaying(true));
        video.addEventListener('pause', () => setIsPlaying(false));

        // Очистка слушателей при размонтировании компонента
        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('volumechange', handleVolumeChange);
            video.removeEventListener('play', () => setIsPlaying(true));
            video.removeEventListener('pause', () => setIsPlaying(false));
        };
    }, []);

    // --- УПРАВЛЕНИЕ ВОСПРОИЗВЕДЕНИЕМ ---
    const handleTogglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const handleSkip = (seconds) => {
        videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + seconds));
    };

    // --- УПРАВЛЕНИЕ ГРОМКОСТЬЮ ---
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        videoRef.current.volume = newVolume;
        videoRef.current.muted = newVolume === 0;
    };
    
    const handleToggleMute = () => {
        const video = videoRef.current;
        video.muted = !video.muted;
        // Восстанавливаем громкость после размьючивания, если она была на нуле
        if (!video.muted && video.volume === 0) {
           video.volume = volumeRef.current || 0.5; // volumeRef хранит предыдущее значение
        }
    };
    
// --- УПРАВЛЕНИЕ ПРОГРЕСС-БАРОМ ---
    const handleProgressSeek = (e) => {
        const progressContainer = progressRef.current;
        const video = videoRef.current;
        if (!progressContainer || !video || !video.duration) return;
        
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, clickX / width));
        
        video.currentTime = percentage * video.duration;
    };

    // --- ПОЛНОЭКРАННЫЙ РЕЖИМ И КАРТИНКА-В-КАРТИНКЕ ---
    const handleToggleFullscreen = async () => {
        const player = playerRef.current;
        if (!document.fullscreenElement) {
            await player.requestFullscreen().catch(err => console.error(err));
        } else {
            await document.exitFullscreen();
        }
    };
    
    const handleTogglePip = async () => {
        const video = videoRef.current;
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else if (video && typeof video.requestPictureInPicture === 'function') {
                await video.requestPictureInPicture();
            }
        } catch(error) {
            console.error("Picture-in-Picture failed:", error);
        }
    };
    
    // --- УПРАВЛЕНИЕ С КЛАВИАТУРЫ ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT') return; // Игнорируем, если фокус на инпуте
            e.preventDefault(); // Предотвращаем стандартное поведение (прокрутка страницы)

            switch (e.code) {
                case 'Space':
                    handleTogglePlay();
                    break;
                case 'ArrowRight':
                    handleSkip(5);
                    break;
                case 'ArrowLeft':
                    handleSkip(-5);
                    break;
                case 'ArrowUp':
                    videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.05);
                    break;
                case 'ArrowDown':
                    videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.05);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Сохраняем последнее значение громкости перед мьютом
    useEffect(() => {
        if (!isMuted) {
            volumeRef.current = volume;
        }
    }, [volume, isMuted]);

    return (
        <div className="player" id="player" ref={playerRef}>
            <video id="video" ref={videoRef} playsInline>
                <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                Тег video не поддерживается вашим браузером.
            </video>

            <div className="progress-wrap" aria-hidden="true"></div>

            <div className="controls" role="group" aria-label="video controls">
                <div className="left">
                    <button className="btn" onClick={handleTogglePlay} title="Play / Pause" aria-label={isPlaying ? "Pause" : "Play"}>
                        {isPlaying ? (
                            <svg id="icon-pause" viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M9 4h2v16H9zM15 4h2v16h-2z"></path></svg>
                        ) : (
                            <svg id="icon-play" viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M6 4l15 8-15 8z"/></svg>
                        )}
                    </button>

                    <button className="btn" onClick={() => handleSkip(-10)} title="Back 10s" aria-label="Back 10 seconds">
                        <img src="/images/icons/video-controls/next.png" alt="Back 10 seconds icon" />
                    </button>
                    <div className="time" id="current">{currentTime}</div>
                </div>

                <div className="center">
                    <div className="volume">
                        <button className="btn" onClick={handleToggleMute} title="Toggle mute" aria-label={isMuted ? "Unmute" : "Mute"}>
                            <img id="icon-volume" src={isMuted || volume === 0 ? "/images/icons/video-controls/mute.png" : "/images/icons/video-controls/volume.png"} alt="Volume icon" />
                        </button>
                        <input id="vol" type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolumeChange} aria-label="Volume" />
                    </div>
                </div>

                <div className="progress" id="progress" ref={progressRef} onMouseDown={handleProgressSeek}>
                    <div className="played" id="played" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="right">
                    <div className="time" id="duration">{duration}</div>

                    <button className="btn small-btn" id="cc" title="Subtitles" aria-label="Subtitles">
                        <img src="/images/icons/video-controls/subtitles.png" alt="Subtitles icon" />
                    </button>

                    <button className="btn small-btn" id="settings" title="Settings" aria-label="Settings">
                        <img src="/images/icons/video-controls/settings.png" alt="Settings icon" />
                    </button>

                    <button className="btn small-btn" id="pip" onClick={handleTogglePip} title="Picture in Picture" aria-label="Picture in Picture">
                        <img src="/images/icons/video-controls/size.png" alt="Picture in Picture icon" />
                    </button>

                    <button className="btn small-btn" id="fs" onClick={handleToggleFullscreen} title="Fullscreen" aria-label="Fullscreen">
                        <img src="/images/icons/video-controls/Fullscreen.png" alt="Fullscreen icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;