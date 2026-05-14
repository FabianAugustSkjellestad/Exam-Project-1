// Function to show the loader
    function showLoader() {
    const loader = document.getElementById("loader");
    if (loader)
        loader.classList.remove("hidden");
    }


// Function to hide the loader
function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader)
        loader.classList.add("hidden");
    }

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const count = cart.reduce((acc, item) => acc + item.quantity, 0)
    const cartCountElements = document.querySelectorAll(".cart-count")
    cartCountElements.forEach(el => {
        el.textContent = count > 0 ? count : ""
    })
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount()
})