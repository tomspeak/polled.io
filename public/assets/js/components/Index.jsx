import React from 'react';
import PollTitle from './PollTitle.jsx';
import TextInput from './TextInput.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <PollTitle />
        <TextInput />
        <h1>WORKING</h1>
      </div>
    );
  }
}

export default App;
