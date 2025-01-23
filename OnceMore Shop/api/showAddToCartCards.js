import products from '../api/product.json';
import { fetchQuantFromCartLS } from './fetchQuantFromCartLS';
import { getCartProductFromLS } from "./getCartProductFromLS";
import { increamentDecreament } from './increamentDecreament';
import { removeProduct } from './removeProduct';
import { updateTotalSummary } from './updateTotalSummary';

const productCartContainer = document.querySelector("#productCartContainer");
const productCartTemplate = document.querySelector("#productCartTemplate");
let cartProducts = getCartProductFromLS();

let filterProducts = products.filter(currProd => {
    return cartProducts.some(currElement => currElement.id === currProd.id);
});

(() => {
    filterProducts.forEach(currProduct => {
        let placeOrderBtn = document.querySelector("#placeOrderBtn");
        placeOrderBtn.style.display = "block";
        document.querySelector(".Summary").style.display = "block";
        productCartContainer.style.display = "block";
        document.querySelector(".emptyCart").style.display = "none";
        const { id, name, category, image, price, stock } = currProduct;

        const productClone = document.importNode(productCartTemplate.content, true);
        const LSPriceQuant = fetchQuantFromCartLS(id, price);

        productClone.querySelector(".card").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").innerHTML = category;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productName").innerHTML = name;
        productClone.querySelector(".productPrice").innerHTML = "₹" + LSPriceQuant.price.toFixed(2);
        productClone.querySelector(".productQuantity").innerHTML = LSPriceQuant.quantity;
        productClone.querySelector(".remove-to-cart-button").addEventListener("click", (e) => {
            removeProduct(e, id);
            document.querySelector(".headerCartButton").innerHTML = localStorage.getItem("cart");
        });
        productClone.querySelector(".stockElement").addEventListener("click", (e) => {
            increamentDecreament(e, id, stock, price);
        })

        productCartContainer.appendChild(productClone);
    })
    document.querySelector(".headerCartButton").innerHTML = localStorage.getItem("cart");

    updateTotalSummary();
    let popup = document.querySelector(".popup");
    let placeOrderBtn = document.querySelector("#placeOrderBtn");
    let okButton = document.querySelector("#okButton");
    
    placeOrderBtn.addEventListener("click",() => {
        popup.classList.add("open-popup");
    });
    okButton.addEventListener("click",() => {
        localStorage.setItem("cart",`${0}`);
        cartProducts = [];
        localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));
        document.querySelector(".emptyCart").style.display = "block";
        placeOrderBtn.style.display = "none";
        productCartContainer.style.display = "none";
        document.querySelector(".headerCartButton").innerHTML = localStorage.getItem("cart");
        updateTotalSummary();
        popup.classList.remove("open-popup");
    });
})();

