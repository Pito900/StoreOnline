import React from 'react';
import * as api from './services/api';

class App extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    api.getCategories().then((categories) => { console.log(categories); });
    return (
      <div className="App">
        <p>Oi</p>
      </div>
    );
  }
}

export default App;
