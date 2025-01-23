import { getCartProductFromLS } from "./getCartProductFromLS";

export const updateTotalSummary = () => {
    const productSubTotalDiv = document.querySelector(".productSubTotal");
    let productSubTotal = 0;
    const productTaxDiv = document.querySelector(".productTax");
    let productTax = 0;
    const productFinalTotalDiv = document.querySelector(".productFinalTotal");
    let cartProducts = getCartProductFromLS();

    if(!cartProducts.length) {
        document.querySelector(".Summary").style.display = "none";
    }
    else {
        document.querySelector(".Summary").style.display = "flex";
    }

    cartProducts.forEach(currProd => {
        productSubTotal += currProd.price;
    });

    productTax = productSubTotal * 0.18;
    productSubTotalDiv.innerHTML = `₹${productSubTotal.toFixed()}`;
    productTaxDiv.innerHTML = `₹${productTax.toFixed()}`;
    productFinalTotalDiv.innerHTML = `₹${(productTax + productSubTotal).toFixed()}`;

}