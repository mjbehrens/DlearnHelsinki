import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../res/icons/UN-Quality Education.jpg'

export default class Footer extends React.Component {
  render() {
  
    return (
        <footer className="footer">
	    <div className="d-flex justify-content-between">
		<div />
		<div className="d-flex justify-content-center">
		    <span>&copy; Dlearn 2017</span>
		</div>
		<div className="d-flex justify-content-right">
		<a href="http://www.un.org/sustainabledevelopment/sustainable-development-goals/"><img src={icon} id="footer-icon" alt="Sustainable development goals" /></a>
		</div>
	    </div>
        </footer>
    );
  }
}
