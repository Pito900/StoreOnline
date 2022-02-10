import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div>
        <input type="text" />
        <Link to="/carrinho" data-testid="shopping-cart-button">
          <img className="icone" src="https://cdn-icons-png.flaticon.com/512/126/126510.png" alt="carrinho de compra" />
        </Link>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
