import React from 'react';
import axios from "axios";
import './App.scss';
import Product from "./components/Product";
import Swipeable from "react-swipy"
import { Button } from "@blueprintjs/core";

async function fetchProducts() {
  const res = await axios.get("https://ycl641scac.execute-api.us-west-2.amazonaws.com/staging/products")
  return res.data.hits;
}

class App extends React.Component {
  state = {
    products: null
  }

  async componentDidMount() {
    const products = await fetchProducts();
    this.setState({ products })
  }

  renderButtons = ({left, right}) => (
    <div>
      <Button onClick={left}>
        DISLIKE
      </Button>
      <Button onClick={right}>
        LIKE
      </Button>
    </div>
  )

  saveResult = () => {
    console.log("HERE");
    
    this.setState(({products}) => ({
      products: products.slice(1, products.length)
    }))
  }

  render() {
    const { products } = this.state;
    console.log("STATE", this.state);
    
    return (
      <div className="bp3-light">
        <Swipeable
          buttons={this.renderButtons}
          onAfterSwipe={this.saveResult}
        >
          <Product currentProduct={products && products[0]}/>
        </Swipeable>
      </div>
    )
  }
}

export default App;
