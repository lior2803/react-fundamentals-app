/**
 * Created by liorbu on 18/10/2017.
 */

// module.exports = {
//     fetchPopularRepos: function (language) {
//         var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
//
//         return axios.get(encodedURI)
//             .then(function (response) {
//                 return response.data.items;
//             });
//     }
//
// };

import axios from 'axios';

var id = "7e38066b38b3f94a9b3a";
var sec = "ed3e7f558c516b5acecd6cd872ec27680affd2f9";
var params = "?client_id=" + id + "&client_secret=" + sec;

async function getProfile (username) {
    var user = await axios.get('https://api.github/users/' + username + params);
    return user.data;
}

async function getRepos(username) {
    var repos = await axios.get('https://api.github/users/' + username + '/repos' + params + '&per_page=100');
    return repos;
}

function getStarCount(repos) {
    return repos.data.reduce(function (count, repo) {
        return count + repo.stargazers_count;
    }, 0);
}

function calculateScore(profile, repos) {
    var followers = profile.followers;
    var totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}

function handleError(error) {
    console.warn(error);
    return null;
}

async function getUserData(player) {
    var data = await axios.all([getProfile(player), getRepos(player)]);
    return {
        profile: data[0],
        scope: calculateScore(data[0], data[1])
    };
}

function sortPlayers(players) {
    return players.sort(function (a, b) {
        return b.score - a.score;
    });
}

async function fetchPopularRepos (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories' + params + '&q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
    var response = await axios.get(encodedURI);
    return response.data.items;
}

async function battle (players) {
    var sortedPlayers = [];
    try {
        sortedPlayers = await axios.all(players.map(getUserData(players)));
    } catch (e) {
        handleError(e);
    }
    return sortPlayers(sortedPlayers);
}

export {fetchPopularRepos, battle};