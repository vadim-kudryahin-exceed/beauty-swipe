
export const likeProduct = () => {
  return { type: "LIKE" };
};

export const dislikeProduct = () => {
  return { type: "DISLIKE" };
};

export const addProducts = (products) => {
  return { type: "ADD_PRODUCTS", payload: products };
};

export const refreshProducts = () => {
    return { type: "REFRESH_PRODUCTS" }
}
