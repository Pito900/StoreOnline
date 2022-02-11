import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
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
        this.setState({ title: resultObj.title })
    }

    render() {
        const { match: { params: { id } } } = this.props
        const { title } = this.state
        return(
            <div>
                <h1 data-testid="product-detail-name">{ title }</h1>
            </div>
        );
    }
}