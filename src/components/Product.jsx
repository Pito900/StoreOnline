import React from 'react';
import '../Styles/product-info.css';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objProduct: {},
        }
    }

    componentDidMount() {
      this.getListLocalStorage();
    }

    getListLocalStorage = () => {
        const { match: { params: { id } } } = this.props
        const listText = localStorage.getItem('Products');
        const listJson = JSON.parse(listText);
        const resultObj = listJson.find((e) => e.id === id);
        this.setState({ objProduct: resultObj })
    }

    render() {
        const { objProduct } = this.state
        const { title, thumbnail, price } = objProduct;
        return(
            <div className="productInfo">
                <div className="product">
                    <h1 data-testid="product-detail-name">{ title }</h1>
                    <img alt="ProductImage" src={ thumbnail } />
                    <h2>R${ price }</h2>
                </div>
            </div>
        );
    }
}