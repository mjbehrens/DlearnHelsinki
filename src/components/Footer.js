import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../res/icons/UN-Quality Education.jpg'

export default class Footer extends React.Component {
  render() {
  
    return (
        <footer>
		<div className="container">
			<a href = "http://www.un.org/sustainabledevelopment/sustainable-development-goals/"><img src={icon} className="Icon" alt="Sustainable development goals" /></a>
		</div>
        </footer>
    );
  }
}
