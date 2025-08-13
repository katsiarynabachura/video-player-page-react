import React from 'react';

const VideoPreviewCard = ({ img, duration, title, views, author }) => {
    return (
        <div className="video-body section-video">
            <div className={`video-preview section-video-preview ${img}`}>
                <p className="video-preview-duration">{duration}</p>
            </div>
            <div className="section-video-info">
                <h5 className="video-info-title">{title}</h5>
                <div className="video-info-main">
                    <div className="video-views">{views}</div>
                    <div className="video-author">{author}</div>
                </div>
            </div>
        </div>
    );
};

export default VideoPreviewCard;