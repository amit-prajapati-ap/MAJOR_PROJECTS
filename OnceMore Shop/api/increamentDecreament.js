import { getCartProductFromLS } from './getCartProductFromLS';
import { updateTotalSummary } from './updateTotalSummary';

export const increamentDecreament = (e,id,stock,price) => {
    const currCardElement = document.querySelector(`#card${id}`);
    const productQuantity = currCardElement.querySelector(".productQuantity");
    const productPrice = currCardElement.querySelector(".productPrice");
    
    let quantity = 1;
    let localStoragePrice = 0;

    let cartProducts = getCartProductFromLS();
    let existingProduct = cartProducts.find(currProd => currProd.id == id);

    if(existingProduct) {
        quantity = existingProduct.quantity;
        localStoragePrice = existingProduct.price;
    }
    else {
        localStoragePrice = price;
    }

    if(e.target.classList.contains("cartIncrement")) {
        if(quantity < stock) {
            quantity++;
        }
        else if (quantity === stock) {
            quantity = stock;
            localStoragePrice = price * quantity;
        }
    }
    else if(e.target.classList.contains("cartDecrement")) {
        if(quantity > 1) {
            quantity--;
        }
    }
    localStoragePrice = price * quantity;

    let updatedCart = {id, quantity, price: localStoragePrice};
    updatedCart = cartProducts.map(currProd => {
        return currProd.id == id ? updatedCart : currProd;
    });
    localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));
    
    productPrice.innerHTML = localStoragePrice.toFixed(2);
    productQuantity.innerHTML = quantity;
    updateTotalSummary();
}