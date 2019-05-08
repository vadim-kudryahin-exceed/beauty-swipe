import React from "react";
import axios from "axios";
import Product from "./components/Product";
import Swipeable from "react-swipy";
import { Button } from "@blueprintjs/core";

class App extends React.Component {
  state = {
    products: null,
    likesCount: 0,
    dislikesCount: 0
  };

  async componentDidMount() {
    await this.fetchProducts();
  }

  fetchProducts = async () => {
    const res = await axios.get(
      "https://ycl641scac.execute-api.us-west-2.amazonaws.com/staging/products"
    );
    this.setState({ products: res.data.hits });
  };

  dislike = left => {
    this.setState(({ dislikesCount }) => ({
      dislikesCount: dislikesCount + 1
    }));
    left();
  };

  like = right => {
    this.setState(({ likesCount }) => ({
      likesCount: likesCount + 1
    }));
    right();
  };

  renderButtons = ({ left, right }) => {
    const { dislikesCount, likesCount } = this.state;
    return (
      <div className="buttons">
        <Button icon="thumbs-down" onClick={() => this.dislike(left)}>
          {`(${dislikesCount})`}
        </Button>
        <Button icon="thumbs-up" onClick={() => this.like(right)}>
          {`(${likesCount})`}
        </Button>
      </div>
    );
  };

  saveResult = () => {
    this.setState(({ products }) => ({
      products: products.slice(1, products.length)
    }));

    const { products } = this.state;

    if (!products.length) {
      this.fetchProducts();
    }
  };

  render() {
    const { products } = this.state;
    console.log("STATE", this.state);

    return (
      <div className="bp3-light">
        <Swipeable buttons={this.renderButtons} onAfterSwipe={this.saveResult}>
          <Product currentProduct={products && products[0]} />
        </Swipeable>
      </div>
    );
  }
}

export default App;
