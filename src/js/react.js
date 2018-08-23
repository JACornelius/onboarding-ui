

class Hello extends React.Component {
  render() {
    return React.createElement('p', null, `Hello ${this.props.toWhat}`);
  }
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'React'}, null),
  document.getElementById('reactTest')
);