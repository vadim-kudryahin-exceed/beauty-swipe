import React from "react";
import axios from "axios";
import Product from "./components/Product";
import Swipeable from "react-swipy";
import { Button, Icon } from "@blueprintjs/core";
import { connect } from "react-redux";
import {
  likeProduct,
  dislikeProduct,
  addProducts,
  refreshProducts
} from "./redux/actions";

class App extends React.Component {
  state = {
    sideToSwipe: null
  };

  async componentDidMount() {
    await this.fetchProducts();
  }

  fetchProducts = async () => {
    const res = await axios.get(
      "https://ycl641scac.execute-api.us-west-2.amazonaws.com/staging/products"
    );
    this.props.addProducts(res.data.hits);
  };

  onAfterSwipe = () => {
    this.props.refreshProducts();

    const { products } = this.props;

    if (!products.length) {
      this.fetchProducts();
    }
  };

  onSwipe = e => {
    if (e === "right") {
      this.props.like();
    } else {
      this.props.dislike();
    }
    this.setState({ sideToSwipe: e });
  };

  renderButtons = ({ left, right }) => {
    const { dislikesCount, likesCount } = this.props;
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
    const { sideToSwipe } = this.state;
    const { products } = this.props;

    return (
      <div className="container">
        <Icon
          className="container-left-icon"
          icon="thumbs-down"
          iconSize={60}
          htmlTitle="Dislike"
          intent={sideToSwipe === "left" ? "danger" : "none"}
        />
        <div className="container-reverse">
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

const mapDispatchToProps = dispatch => {
  return {
    like: () => {
      dispatch(likeProduct());
    },
    dislike: () => {
      dispatch(dislikeProduct());
    },
    addProducts: products => {
      dispatch(addProducts(products));
    },
    refreshProducts: () => {
      dispatch(refreshProducts());
    }
  };
};

const mapStateToProps = state => {
  return {
    likesCount: state.likesCount,
    dislikesCount: state.dislikesCount,
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
