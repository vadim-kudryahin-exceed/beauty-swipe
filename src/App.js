import React from "react";
import axios from "axios";
import Product from "./components/Product";
import Swipeable from "react-swipy";
import { Button, Icon } from "@blueprintjs/core";

class App extends React.Component {
  state = {
    products: null,
    likesCount: 0,
    dislikesCount: 0,
    sideToSwipe: null
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

  onSwipe = e => {
    if (e === "right") {
      this.like()
    } else {
      this.dislike()
    }
    this.setState({ sideToSwipe: e });
  };

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
    const { products, sideToSwipe } = this.state;

    return (
      <div className="container">
        <Icon
          className="container-left-icon"
          icon="thumbs-down"
          iconSize={60}
          htmlTitle="Dislike"
          intent={sideToSwipe === "left" ? "danger" : "none"}
        />
        <div>
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
        <Icon
          className="container-right-icon"
          icon="thumbs-up"
          iconSize={60}
          htmlTitle="Like"
          intent={sideToSwipe === "right" ? "success" : "none"}
        />
      </div>
    );
  }
}

export default App;
