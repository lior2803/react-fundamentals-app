/**
 * Created by liorbu on 21/10/2017.
 */
//import ReactRouter from 'react-router-dom'
import React from 'react';
import { NavLink }  from 'react-router-dom';

export default function Nav() {
    return (
        <ul className='nav'>
            <li>
                <NavLink exact activeClassName='active' to='/'>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/battle'>
                    Battle
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/popular'>
                    Popular
                </NavLink>
            </li>
        </ul>
    )
};