import React from 'react';
import './assets/index.css';

import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import VideoPlayerBlock from './components/VideoPlayerBlock.jsx';
import SideVideos from './components/SideVideos.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <div id="wrapper">
          <VideoPlayerBlock />
          <SideVideos />
        </div>
      </main>
    </>
  );
}

export default App;