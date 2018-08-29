import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
  render() {
    return React.createElement('p', null, `Hello ${this.props.toWhat}`);
  }
}
export const run = () => {
	// ReactDOM.render(
 //  	React.createElement(Hello, {toWhat: 'React'}, null),
 //  	document.getElementById('reactTest')
	// );
	return React.createElement(Hello, {toWhat: 'React'}, null);
}

