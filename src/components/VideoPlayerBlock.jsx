import React from 'react';
import VideoPlayer from './VideoPlayer.jsx';
import VideoDetails from './VideoDetails.jsx';
import ChannelInfo from './ChannelInfo.jsx';

const VideoPlayerBlock = () => {
    return (
        <section className="video-block">
            <VideoPlayer />
            <VideoDetails />
            <hr />
            <ChannelInfo />
            <hr />
        </section>
    );
};

export default VideoPlayerBlock;