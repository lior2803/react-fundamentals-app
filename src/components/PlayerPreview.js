/**
 * Created by liorbu on 24/10/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function PlayerPreview(props) {
    return (
        <div>
            <div className="column">
                <img
                    className="avatar"
                    alt={'Avatar for ' + props.username}
                    src={props.avatar}
                />
                <h2 className="username">@{props.username}</h2>
            </div>
            {props.children}
        </div>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
};