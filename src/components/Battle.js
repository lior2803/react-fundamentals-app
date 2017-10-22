/**
 * Created by liorbu on 21/10/2017.
 */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PlayerPreview(props) {
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
            <button
                className="reset"
                onClick={props.onReset.bind(null, props.id)}>
                Reset
            </button>
        </div>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

class PlayerInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.props.id, this.state.username);
    }

    render() {
        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">
                    {this.props.label}
                </label>
                <input
                    id="username"
                    placeholder="github username"
                    type="text"
                    autoComplete="off"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <button
                    className="button"
                    type="submit"
                    disabled={!this.state.username}>
                    Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

class Battle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username) {
        var newState = {};
        newState[id + 'Name'] = username;
        newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
        this.setState(newState);
    }

    handleReset(id) {
        var newState = {};
        newState[id + 'Name'] = '';
        newState[id + 'Image'] = null;
        this.setState(newState);
    }

    render() {
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;
        var match = this.props.match;

        return (
            <div>
                <div className="row">
                    {!playerOneName &&
                        <PlayerInput
                            id="playerOne"
                            label="Player One"
                            onSubmit={this.handleSubmit}
                        />
                    }

                    {playerOneImage &&
                        <PlayerPreview
                            username={playerOneName}
                            avatar={playerOneImage}
                            onReset={this.handleReset}
                            id="playerOne"
                        />
                    }

                    {!playerTwoName &&
                        <PlayerInput
                            id="playerTwo"
                            label="Player Two"
                            onSubmit={this.handleSubmit}
                        />
                    }

                    {playerTwoImage &&
                        <PlayerPreview
                            username={playerTwoName}
                            avatar={playerTwoImage}
                            onReset={this.handleReset}
                            id="playerTwo"
                        />
                    }
                </div>

                {playerOneImage && playerTwoImage &&
                    <Link
                        className="button"
                        to={{
                            pathname: match.url + '/results',
                            search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                        }}>
                        Battle
                    </Link>
                }
            </div>
        )
    }
}


export default Battle;