import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../res/icons/UN-Quality Education.jpg'

export default class Footer extends React.Component {
  render() {
  
    return (
        <footer>

	    <div className="row">
		<div className="col-md-4 left-align">

		</div>
		<div className="col-md-4 centered">
		<span>&copy; Dlearn 2017</span>
		</div>
		<div className="col-md-4 right-align">
		    <a href = "http://www.un.org/sustainabledevelopment/sustainable-development-goals/"><img src={icon} className="Icon" alt="Sustainable development goals" /></a>
		</div>
	    </div>
        </footer>
    );
  }
}
