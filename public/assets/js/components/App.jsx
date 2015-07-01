import React from 'react';
import PollTitle from './PollTitle.jsx';
import TextInput from './TextInput.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Polled</h1>
        {this.props.children}
      </div>
    );
  }
}

export default App;
