import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import './Home.css';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      listCategories: [],
    };
  }

  componentDidMount() {
    this.getCategoriesList();
  }

  getCategoriesList = async () => {
    const response = await getCategories();
    response.forEach((e) => {
      this.setState((prevState) => ({
        listCategories: [...prevState.listCategories, e.name] }));
    });
  }

  render() {
    const { listCategories } = this.state;

    return (
      <div className="main">
        <aside>
          <ul>
            {listCategories.map((categorie, index) => (
              <label
                data-testid="category"
                htmlFor={ categorie }
                key={ index }
              >
                <input id={ categorie } name="category" type="radio" />
                {categorie}
              </label>
            ))}
          </ul>
        </aside>
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
