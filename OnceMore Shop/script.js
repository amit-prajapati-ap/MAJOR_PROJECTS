import { showProductContainer } from './api/homeProductCards';
import products from './api/product.json';

document.addEventListener("DOMContentLoaded", () => {

    showProductContainer(products);
    document.querySelector(".headerCartButton").innerHTML = localStorage.getItem("cart") || 0;
    
});