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
        const {id, name, category, image, price, stock} = currProduct;

        const productClone = document.importNode(productCartTemplate.content,true);
        const LSPriceQuant = fetchQuantFromCartLS(id,price);

        productClone.querySelector(".card").setAttribute ("id",`card${id}`);
        productClone.querySelector(".category").innerHTML = category;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productName").innerHTML = name;
        productClone.querySelector(".productPrice").innerHTML = "₹" + LSPriceQuant.price.toFixed(2);
        productClone.querySelector(".productQuantity").innerHTML = LSPriceQuant.quantity;
        productClone.querySelector(".remove-to-cart-button").addEventListener("click",(e) => {
            removeProduct(e,id);
            document.querySelector(".headerCartButton").innerHTML = localStorage.getItem("cart");
        });
        productClone.querySelector(".stockElement").addEventListener("click",(e) => {
            increamentDecreament(e,id,stock,price);
        })

        productCartContainer.appendChild(productClone);
    })
    document.querySelector(".headerCartButton").innerHTML = localStorage.getItem("cart");

    updateTotalSummary();
})();
