export const getCartProductFromLS = () => {
    let cartProducts = localStorage.getItem("cartProductLS");
    if(!cartProducts) {
        return [];
    }
    else {
        cartProducts = JSON.parse(cartProducts);
        return cartProducts;
    }
}