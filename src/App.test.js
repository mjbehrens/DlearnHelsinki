import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TestApp extends Component {
	render() {

		return (
			<div>
			<p>This is a basic test component</p>
			</div>
			);
	}
}

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<TestApp />, div);
});