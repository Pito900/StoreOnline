import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Carrinho from './components/Carrinho';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={ Home } />
          <Route path="/carrinho" component={ Carrinho } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
