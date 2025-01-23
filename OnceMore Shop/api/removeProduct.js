import { getCartProductFromLS } from "./getCartProductFromLS"
import { showToast } from "./showToast";
import { updateTotalSummary } from "./updateTotalSummary";

export const removeProduct = (e,id) => {
    let cartProducts = getCartProductFromLS();
    cartProducts = cartProducts.filter(currProd => currProd.id != id);

    localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

    const parent = document.querySelector(`#card${id}`).parentElement;
    parent.remove();

    let cart = parseInt(localStorage.getItem("cart"));
    cart--;
    localStorage.setItem("cart",`${cart}`);
    updateTotalSummary();

    if(cart == 0) {
        document.querySelector(".emptyCart").style.display = "block";
        document.querySelector(".Summary").style.display = "none";
    }

    showToast(false, id);
}