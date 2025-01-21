
export const showToast = (flag,id) => {
    let toastBox = document.getElementById("toastbox");
    
    let successMsg = `<i class="fa-solid fa-circle-check"></i>Product with ID ${id} has been Added`;
    let errorMsg = `<i class="fa-solid fa-circle-xmark"></i>Product with ID ${id} has been Removed`;

    let toast = document.createElement("div");
    toast.classList.add("toast");
    
    if(flag) {
        toast.classList.add("added");
        toast.innerHTML = successMsg;
    }
    else {
        toast.classList.add("removed");
        toast.innerHTML = errorMsg;
    }
    toastBox.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 6000);
}