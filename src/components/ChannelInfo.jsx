import React from 'react';

const ChannelInfo = () => {
    return (
        <div className="video-info">
            <div className="channel-image">
                <img src="/images/avatars/avatar-food-and-drinks.jpg" alt="Channel image" />
            </div>
            <div className="channel-info">
                <div className="channel-info-header">
                    <div className="channel-name">
                        <h3>Food & Drink</h3>
                        <p className="channel-published">Published on 14 Jun 2019</p>
                        <p className="channel-subscribed">245k subscribed</p>
                    </div>
                    <button className="channel-header-btns-subscribe">Subscribe<span> 2.3m</span></button>
                </div>
                <p>
                    A successful marketing plan relies heavily on the pulling-power of advertising copy. Writing result-oriented ad copy is difficult, as it must appeal to, entice, and convince consumers to take action. There is no magic formula to write perfect ad copy; it is based on a number of factors, including ad placement, demographic, even the consumer’s mood when they see your ad. 
                </p>
                <p>Show more</p>
            </div>
        </div>
    );
};

export default ChannelInfo;