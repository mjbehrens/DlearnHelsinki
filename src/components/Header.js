import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ROUTES } from '../constants.js';
import logo from '../res/icons/dlearn_logo.svg';
import LoginLogout from './LoginLogout.js';

export default class Header extends React.Component {
  render() {
    return (
      <header>

        <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-static-top">
            <Link to={ROUTES.ROOT}><a className="navbar-brand" href="">Dlearn</a></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
            <Link to={ROUTES.ROOT}><a className="nav-link" href="">Home</a></Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div className="dropdown-menu" aria-labelledby="dropdown01">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul>
	    <LoginLogout />
          </div>
        </nav>


      </header>
    );
  }
}
