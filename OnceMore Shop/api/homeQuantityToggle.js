export const homeQuantityToggle = (e, id, stock) => {
    const currCardElement = document.querySelector(`#card${id}`);
    const productQuantity = currCardElement.querySelector(".productQuantity");
    
    let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

    if(e.target.classList.contains("cartIncrement")) {
        if(quantity < stock) {
            quantity++;
        }
        else if (quantity === stock) {
            quantity = stock;
        }
    }
    else if(e.target.classList.contains("cartDecrement")) {
        if(quantity > 1) {
            quantity--;
        }
    }

    productQuantity.innerHTML = quantity;
    productQuantity.setAttribute("data-quantity", quantity);
    return quantity;
}