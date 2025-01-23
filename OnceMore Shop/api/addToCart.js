import { getCartProductFromLS } from "./getCartProductFromLS";
import { showToast } from "./showToast";

export const addToCart = (e, id, stock) => {

    let localStorageProduct = getCartProductFromLS();

    const currProductElement = document.querySelector(`#card${id}`);

    let quantity = currProductElement.querySelector(".productQuantity").innerText;
    let price = currProductElement.querySelector(".productPrice").innerText;

    price = parseFloat(price.replace("₹", ""));
    quantity = parseInt(quantity);

    let existing = localStorageProduct.filter((item) => item.id == id);
    if (existing.length) {
        localStorageProduct.forEach((item) => {
            if ((item.id == existing[0].id)) {
                if ((existing[0].quantity + quantity) - stock >= 0) {
                    const remainingQuantity = stock - existing[0].quantity;
                    price *= remainingQuantity;
                    item.price += price;
                    item.quantity += remainingQuantity;
                }
                else {
                    price *= quantity;
                    item.price += price;
                    item.quantity += quantity;
                }
            }
        });
        localStorage.setItem("cartProductLS", JSON.stringify(localStorageProduct));
    }
    else {
        price *= quantity;
        
        let updateCart = { id, quantity, price };
        localStorageProduct.push(updateCart);
        
        localStorage.setItem("cartProductLS", JSON.stringify(localStorageProduct));
        
        //Updating Cart Value
        let cartButton = document.querySelector(".headerCartButton");
        cartButton.innerHTML = localStorageProduct.length;
        localStorage.setItem("cart", `${localStorageProduct.length}`);
    }
    showToast(true, id);
}