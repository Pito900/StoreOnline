import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as api from './services/api';
import Home from './components/Home';

class App extends React.Component {
  // constructor() {
  //   super();
  // }

  render() {
    api.getCategories().then((categories) => { console.log(categories); });
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
