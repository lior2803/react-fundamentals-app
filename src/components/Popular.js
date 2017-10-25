/**
 * Created by liorbu on 27/09/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'
//var api = require('../utils/api')

//Upper case is important in 'SelectLanguage'
function SelectLanguage (props) {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className='languages'>
            {languages.map(function (lang) {
                return (
                    <li
                        style={lang === props.selectedLanguage ? {color:'#d0021b'} : null}
                        key={lang}
                        onClick={props.updateLanguage.bind(null, lang)}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    )
}

function ReposGrid (props) {
    return (
        <ul className='popular-list'>
            {props.repos.map(function (repo, index) {
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

SelectLanguage.propType = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

ReposGrid.propTypes = {
    repos : PropTypes.array.isRequired
};

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };

        // The bind will take a context and return a new function
        // when the this keyword inside that function is bound
        // to whatever is passed in.
        // Meaning that this is bound to the popular component (the 'Up here' this)
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    async updateLanguage(lang) {
        this.setState(
            {
                selectedLanguage: lang,
                repos : null
            }
        );

        this.setState(
            {
                repos : await fetchPopularRepos(lang)
            }
        );
    }

    // updateLanguage(lang) {
    //     this.setState(
    //         {
    //             selectedLanguage: lang,
    //             repos : null
    //         }
    //     );
    //
    //     api.fetchPopularRepos(lang).then(function (repos) {
    //         this.setState( function () {
    //             return {
    //                 repos : api.fetchPopularRepos(lang)
    //             }
    //         });
    //     }.bind(this));
    // }

    // map allows you to pass a second argument with the context
    render() {
        //console.log('Up here', this);
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    updateLanguage={this.updateLanguage}
                />
                {!this.state.repos
                    ? <Loading/>
                    : <ReposGrid repos={this.state.repos}/>}
            </div>
        )
    }
}

export default Popular;