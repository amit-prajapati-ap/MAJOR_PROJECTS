import { getCartProductFromLS } from "./getCartProductFromLS";

export const fetchQuantFromCartLS = (id,price) => {
    let cartProducts = getCartProductFromLS();

    let existingProduct = cartProducts.find(currprod => currprod.id == id);
    let quantity = 1;

    if(existingProduct) {
        quantity = existingProduct.quantity;
        price = existingProduct.price;
    }

    return {quantity,price};
}