import { showProductContainer } from './api/homeProductCards';
import products from './api/product.json';

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#emailbtn").addEventListener("click", () => {
        let emailInput = document.querySelector("#email");
        (() => {
            let email = emailInput.value;
            if (email.length == 0) {
                alert("Please Enter the Email");
            }
            else if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
                alert("Please Enter the Correct Email");
            }
            else {                
                alert("Your Email Succesfully Submited");
                emailInput.value = "";
            }
        })();
    })

    
    showProductContainer(products);
    document.querySelector(".headerCartButton").innerHTML = localStorage.getItem("cart") || 0;


});
