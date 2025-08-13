import React, { useState } from 'react'; // 1. Импортируем useState
import VideoPreviewCard from './VideoPreviewCard.jsx';

const sideVideosData = [
    { id: 1, img: 'channel-2-img1', duration: '4:15', title: 'Astronomy Or Astrology', views: '240k views · 4 months ago', author: 'Food & Drink' },
    { id: 2, img: 'channel-2-img2', duration: '8:00', title: 'Advertising Outdoors', views: '13k views · 15 days ago', author: 'Food & Drink' },
    { id: 3, img: 'channel-2-img3', duration: '5:32', title: 'Radio Astronomy', views: '1k views · 11 months ago', author: 'Food & Drink' },
    { id: 4, img: 'channel-2-img4', duration: '5:32', title: 'Radio Astronomy', views: '1k views · 11 months ago', author: 'Food & Drink' },
    { id: 5, img: 'channel-2-img5', duration: '5:32', title: 'Radio Astronomy', views: '1k views · 11 months ago', author: 'Food & Drink' },
    { id: 6, img: 'channel-2-img6', duration: '5:32', title: 'Radio Astronomy', views: '1k views · 11 months ago', author: 'Food & Drink' },
];

const SideVideos = () => {
    // 2. Создаем состояние для переключателя, по умолчанию он включен
    const [isAutoplayOn, setIsAutoplayOn] = useState(true);

    // 3. Функция для изменения состояния при клике
    const handleToggle = () => {
        setIsAutoplayOn(prevState => !prevState);
    };

    return (
        <section className="side-videos-block">
            <div className="autoplay">
                <p>Next</p>
                <div className="autoplay-toggle">
                    <p>AUTOPLAY</p>
                    {/* 4. Превращаем div в кнопку, добавляем условный класс и обработчик клика */}
                    <button 
                        className={`autoplay-toggle-button ${isAutoplayOn ? 'active' : ''}`}
                        onClick={handleToggle}
                        aria-label="Autoplay toggle"
                    >
                        <div className="toggle-thumb"></div>
                    </button>
                </div>
            </div>
            <div className="side-videos-list">
                <div className="section-body carousel__track">
                    {sideVideosData.map(video => (
                        <VideoPreviewCard key={video.id} {...video} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SideVideos;
