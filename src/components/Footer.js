import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../res/icons/UN-Quality Education.jpg'

export default class Footer extends React.Component {
  render() {
  
    return (
        <footer>
	    <nav className="navbar navbar-inverse bg-inverse navbar-default navbar-fixed-bottom">
		<div className="container">
		   <div id="navbar" className="navbar-collapse collapse">
			<a href = "http://www.un.org/sustainabledevelopment/sustainable-development-goals/"><img src={icon} className="Icon" alt="Sustainable development goals" /></a>
		    </div>
		</div>
	    </nav>
        </footer>
    );
  }
}
