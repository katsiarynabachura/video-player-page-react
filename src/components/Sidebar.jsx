import React from 'react';
import SidebarLink from './SidebarLink.jsx';
import SubscriptionLink from './SubscriptionLink.jsx';

// Data for the links to keep JSX clean
const mainMenuItems = [
  { icon: 'home.png', text: 'Home' },
  { icon: 'flame.png', text: 'Trending' },
  { icon: 'list.png', text: 'Subscriptions' },
  { icon: 'folder.png', text: 'Library' },
  { icon: 'history.png', text: 'History' },
  { icon: 'clock.png', text: 'Watch later' },
  { icon: 'star.png', text: 'Favourites' },
  { icon: 'heart.png', text: 'Liked videos' },
  { icon: 'note.png', text: 'Music' },
  { icon: 'controller.png', text: 'Games' },
  { icon: 'menu-arrow-down.png', text: 'Show more' },
];

const subscriptions = [
    { avatar: 'avatar-1.jpg', name: 'Gussie Singleton' },
    { avatar: 'avatar-2.jpg', name: 'Nora Francis' },
    { avatar: 'avatar-3.jpg', name: 'Belle Briggs' },
    { avatar: 'avatar-4.jpg', name: 'Eunice Cortez' },
    { avatar: 'avatar-5.jpg', name: 'Emma Hanson' },
    { avatar: 'avatar-6.jpg', name: 'Leah Berry' },
];

const Sidebar = () => {
  return (
    <aside>
      <nav aria-label="Main menu">
        <ul className="aside-menu-list main-menu-list">
          {mainMenuItems.map(item => (
            <SidebarLink key={item.text} icon={item.icon} text={item.text} />
          ))}
        </ul>
      </nav>

      <nav className="subscriptions-menu-nav" aria-labelledby="subscriptions-heading">
        <h5 id="subscriptions-heading">Subscriptions</h5>
        <ul className="subscriptions-menu-list">
          {subscriptions.map(sub => (
            <SubscriptionLink key={sub.name} avatar={sub.avatar} name={sub.name} />
          ))}
        </ul>
      </nav>

      <a className="setting">
        <img className="menu-list-icon" src="/images/icons/gear.png" alt="Gear" />
        <p>Setting</p>
      </a>
    </aside>
  );
};

export default Sidebar;