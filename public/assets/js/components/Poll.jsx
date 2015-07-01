import React from 'react';

class Poll extends React.Component {
  componentDidMount () {
    console.log('Mounted');
  }

  render () {
    return (
      <h1>View A Poll</h1>
    );
  }
}

export default Poll;
