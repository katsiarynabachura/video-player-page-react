import React from 'react';

const VideoDetails = () => {
  const actionButtons = [
    { icon: 'like.png', text: '123k', alt: 'Like' },
    { icon: 'dislike.png', text: '435k', alt: 'Dislike' },
    { icon: 'share.png', text: 'Share', alt: 'Share' },
  ];

  return (
    <div className="video-header">
      <div className="video-title">
        <h1>Dude You Re Getting A Telescope</h1>
        <img className="title-show-more" src="/images/icons/video-section-icons/show-more.png" alt="Show more" />
      </div>
      <div className="video-header-main-info">
        <div className="video-header-info-views">123k views</div>
        <div className="video-header-info-likes carousel">
          <ul className="carousel__track">
            {actionButtons.map(btn => (
              <li className="carousel__track-item" key={btn.alt}>
                <button className="video-info-button">
                  <img src={`/images/icons/video-section-icons/${btn.icon}`} alt={btn.alt} />
                  <p>{btn.text}</p>
                </button>
              </li>
            ))}
            <li className="carousel__track-item dots">
              <button className="video-info-button">
                <img src="/images/icons/video-section-icons/more.png" alt="More" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;