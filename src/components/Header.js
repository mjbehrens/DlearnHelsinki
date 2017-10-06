import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import logo from '../res/icons/dlearn_logo.svg';

export default class Header extends React.Component {
  render() {
    return (
      <header>

    <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-static-top">
    <Link to="/"><a className="navbar-brand" href="">Dlearn</a></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/"><a className="nav-link" href="">Home</a></Link>
          </li>
          <li className="nav-item">
	    <a className="nav-link" href="#">About</a>
          </li>
	  <li classNameName="nav-item">
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
	<Link to="/login"><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button></Link>
      </div>
    </nav>

	
      </header>
    );
  }
}
