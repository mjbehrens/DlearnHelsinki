import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../pages/icons/UN-Quality Education.jpg'

export default class Footer extends React.Component {
  render() {
  
    return (
        <div className = "App">
            <div className = "App-footer">
                <Link to = "http://www.un.org/sustainabledevelopment/sustainable-development-goals/"><img src={icon} className="Icon" alt="Sustainable development goals" /></Link>
            </div>
        </div>
    );
  }
}
