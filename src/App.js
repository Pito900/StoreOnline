import React from 'react';
import * as api from './services/api';
import Home from './components/Home';
import {BrowserRouter, Route} from 'react-router-dom'

class App extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={Home}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
