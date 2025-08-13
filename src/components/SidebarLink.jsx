import React from 'react';

const SidebarLink = ({ icon, text }) => {
  return (
    <li>
      <a href="#">
        <img className="menu-list-icon" src={`/images/icons/${icon}`} alt={text} />
        <p>{text}</p>
      </a>
    </li>
  );
};

export default SidebarLink;