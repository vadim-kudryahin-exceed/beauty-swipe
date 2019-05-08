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

  dislike = () => {
    this.setState(({ dislikesCount }) => ({
      dislikesCount: dislikesCount + 1
    }));
  };

  like = () => {
    this.setState(({ likesCount }) => ({
      likesCount: likesCount + 1
    }));
  };

  onAfterSwipe = () => {
    this.setState(({ products }) => ({
      products: products.slice(1, products.length)
    }));

    const { products } = this.state;

    if (!products.length) {
      this.fetchProducts();
    }
  };

  onSwipe = (e) => (e === "right" ? this.like() : this.dislike());

  renderButtons = ({ left, right }) => {
    const { dislikesCount, likesCount } = this.state;
    return (
      <div className="buttons">
        <Button icon="thumbs-down" onClick={left}>
          {`(${dislikesCount})`}
        </Button>
        <Button icon="thumbs-up" onClick={right}>
          {`(${likesCount})`}
        </Button>
      </div>
    );
  };

  render() {
    const { products } = this.state;

    return (
      <div className="bp3-light">
        <Swipeable
          buttons={this.renderButtons}
          onAfterSwipe={this.onAfterSwipe}
          onSwipe={this.onSwipe}
          limit={300}
          offset={150}
        >
          <Product currentProduct={products && products[0]} />
        </Swipeable>
      </div>
    );
  }
}

export default App;
