/**
 * Created by liorbu on 21/10/2017.
 */
import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  openSideBar(){
    return (
      console.log('opened')
    )
  }

  render () {
    return (
      <div className="home-container">
        <h1>Github Battle: Battle your friends...and stuff.</h1>
        <Link className="button" to="./battle">
          Battle
        </Link>
      </div>
    )
  }
}

export default Home;