import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="header-block-1">
        <img className="menu-icon" src="/images/icons/menu.png" alt="Menu bar" />
        <img className="logo-icon" src="/images/icons/youtube-logo.png" alt="YouTube logo" />
      </div>

      <div className="header-block-2">
        <div className="search-block">
          <input className="search-input" type="text" placeholder="Search" />
          <button className="search-button">
            <img src="/images/icons/search.png" alt="Search button" />
          </button>
        </div>
        <nav className="header-nav-block" aria-label="Main menu on the top of the page">
          <ul className="header-nav-list">
            <li><img src="/images/icons/translation.png" alt="Start translation" /></li>
            <li><img src="/images/icons/services.png" alt="Open services" /></li>
            <li><img src="/images/icons/notifications.png" alt="View notifications" /></li>
            <li className="userprofile-li"><img src="/images/icons/usericon.png" alt="Go to user profile" /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;