import React from 'react';

const SubscriptionLink = ({ avatar, name }) => {
    return (
        <li>
            <a href="#">
                <img className="subscriptions-avatar" src={`/images/avatars/subscriptions-avatars/${avatar}`} alt={`${name} channel avatar`} />
                <p>{name}</p>
            </a>
        </li>
    );
};

export default SubscriptionLink;