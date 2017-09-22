import React from 'react';
import logo from './dlearn_logo.svg';

export default class Header extends React.Component {
  render() {
  
    return (
		<div className="App-header">
                <p>
                    <img src={logo} className="App-logo" alt="logo" />
                </p>
                    <p>Learning global competencies with new pedagogical tools</p>
		</div>
    );
  }
}
