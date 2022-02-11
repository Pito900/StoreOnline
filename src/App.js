import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Carrinho from './components/Carrinho';
import Product from './components/Product';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/product/:id" render={(props) => <Product {...props} />} />
            <Route path="/carrinho" component={ Carrinho } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
