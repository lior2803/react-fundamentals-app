/**
 * Created by liorbu on 21/10/2017.
 */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

 class Home extends Component {
     render () {
         return (
             <div className="home-container">
                 <h1>Github Battle: Battle your friends...and stuff.</h1>
                 <Link className="button" to="./battle">
                     Battle
                 </Link>
                 <button type="button">Click Me!</button>
             </div>
         )
     }
 }

 export default Home;
