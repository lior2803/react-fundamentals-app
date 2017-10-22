/**
 * Created by liorbu on 18/10/2017.
 */

import axios from 'axios';

async function fetchPopularRepos (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    var response = await axios.get(encodedURI);
    return response.data.items;
};

function battle (players) {

};

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

export {fetchPopularRepos, battle};