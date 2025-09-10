import React, { useRef, useState } from 'react';
import './videoplayer.css';

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <div className="video-wrapper">
            <video
                ref={videoRef}
                className="responsive-video"
                autoPlay
                muted={muted}
                loop
                playsInline
                preload="metadata"
            >
                <source src="https://storage.yandexcloud.net/files-for-sites/fitbox.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео. Обновите его или используйте другой.
            </video>
            <button
                className={`mute-btn ${muted ? 'muted' : 'unmuted'}`}
                onClick={toggleMute}
                aria-label={muted ? "Включить звук" : "Выключить звук"}
            >
                <span className="icon">{muted ? '🔇' : '🔊'}</span>
            </button>
        </div>
    );
};

export default VideoPlayer;
