/**
 * Created by liorbu on 22/10/2017.
 */
import React, {Component} from 'react';
import QueryString from 'query-string';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview'

function Profile(props) {
    var info = props.info;
    return(
        <PlayerPreview username={info.login} avatar={info.avatar_url}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
};

function Player(props) {
    return(
      <div>
          <h1 className="header">{props.label}</h1>
          <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
          <Profile info={props.profile}/>
      </div>
    );
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
    score: PropTypes.number.isRequired
};

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        };
    }

    async componentDidMount() {
        var players = QueryString.parse(this.props.location.search);

        var results = await battle([players.playerOneName, players.playerTwoName]);
        if (results === null) {
            this.setState(function () {
                return {
                    error: 'Failure, check that both users exist on Github',
                            loading: false,
                            winner: null,
                            loser: null
                }
            });
        } else {
            this.setState(function () {
                return {
                    loading: false,
                    winner: results[0],
                    loser: results[1],
                    error: null
                }
            });
        }
    }

    render() {
        var error = this.state.error;
        var winner = this.state.winner;
        var loser = this.state.loser;
        var loading = this.state.loading;

        if (loading) {
            return (
                <p>Loading...</p>
            )
        }
        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }
        return (
            <div className='row'>
                <Player
                    label="Winner"
                    profile={winner.profile}
                    score={winner.score}
                />
                <Player
                    label="Loser"
                    profile={loser.profile}
                    score={loser.score}
                />
            </div>
        )
    }
}

export default Results;