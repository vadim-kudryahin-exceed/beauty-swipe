import {
  LIKE,
  DISLIKE,
  ADD_PRODUCTS,
  REFRESH_PRODUCTS
} from "../constants/action-types";

const initialState = {
  products: null,
  likesCount: 0,
  dislikesCount: 0
};

const rootReducer = (state = initialState, action) => {
  const { products, likesCount, dislikesCount } = state;
  if (!action) return null;

  if (action.type === LIKE) {
    return Object.assign({}, state, {
      likesCount: (state.likesCount = likesCount + 1)
    });
  }

  if (action.type === DISLIKE) {
    return Object.assign({}, state, {
      dislikesCount: (state.dislikesCount = dislikesCount + 1)
    });
  }

  if (action.type === ADD_PRODUCTS) {
    return Object.assign({}, state, {
      products: action.payload
    });
  }

  if (action.type === REFRESH_PRODUCTS) {
    return Object.assign({}, state, {
      products: products.slice(1, products.length)
    });
  }

  return state;
};

export default rootReducer;
