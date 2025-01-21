import { addToCart } from "./addToCart";
import { homeQuantityToggle } from "./homeQuantityToggle";

const productContainer = document.querySelector("#productContainer");
const productTemplate = document.querySelector("#productTemplate");

export const showProductContainer = (products) => {
    if (!products) {
        return false;
    }

    products.forEach((product) => {
        const { id, name, category, description, image, price, stock } = product;

        const productClone = document.importNode(productTemplate.content, true);

        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").innerHTML = name;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productName").innerHTML = category;
        productClone.querySelector(".productDescription").innerHTML = description;
        productClone.querySelector(".productPrice").innerHTML = "₹" + price;
        productClone.querySelector(".productActualPrice").innerHTML = "₹" + (price * 3).toFixed(2);
        productClone.querySelector(".productStock").innerHTML = stock;

        productClone.querySelector(".stockElement").addEventListener("click", (e) => { homeQuantityToggle(e, id, stock) });

        productClone.querySelector(".add-to-cart-button").addEventListener("click", (e) => { addToCart(e, id, stock) });

            productContainer.append(productClone);
    });
}