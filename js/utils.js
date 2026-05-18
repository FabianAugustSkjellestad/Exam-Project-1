// Function to show the loader
    function showLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.remove("hidden");
        loader.style.display = "flex"; // Ensure loader is visible
    }
}


// Function to hide the loader
function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("hidden");
        loader.style.display = "none"; // Ensure loader is hidden
    }
}

// Auto-hide the loader after the page has fully loaded
window.addEventListener("load", () => {
    setTimeout(() => {
        hideLoader();
    }, 300);
})


// Function for hamburger menu toggle //
const hamburgerMenu = document.getElementById("hamburgerMenu")
const mobileMenu = document.getElementById("mobileMenu")

hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active")

    const icon = hamburger.querySelector("i")
    icon.classList.toggle("fa-bars")
    icon.classList.toggle("fa-xmark")

    navMenu.classList.toggle("active")

    updateCartCount()
});


// Function to update the cart count in the header
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