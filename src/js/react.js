class Hello extends React.Component {
  render() {
    return React.createElement('p', null, `Hello ${this.props.toWhat}`);
  }
}
function run(){
	ReactDOM.render(
  	React.createElement(Hello, {toWhat: 'React'}, null),
  	document.getElementById('reactTest')
	);
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body){
	run();
}
else{
	window.addEventListener('DOMContentLoaded', run, false);
}