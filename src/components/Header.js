import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import logo from '../res/icons/dlearn_logo.svg';

export default class Header extends React.Component {
  render() {
//The Dlearn link to homepage is inactive
    return (
        <header>
        <Router>
            <nav className="navbar navbar-inverse bg-inverse navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link style={{dispaly: 'block', height: '100%'}} to="/"><a className="navbar-brand" href="#">Dlearn</a></Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li className="active"><Link style={{dispaly: 'block', height: '100%'}} to="/">Home</Link></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                            <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" className="divider"></li>
                                <li className="dropdown-header">Nav header</li>
                                <li><a href="#">Separated link</a></li>
                                <li><a href="#">One more separated link</a></li>
                            </ul>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link style={{dispaly: 'block', height: '100%'}} to="/login">Login</Link></li>
                        </ul>
                    </div>
                </div>
            </nav> 
        </Router>
        </header>
    );
  }
}
