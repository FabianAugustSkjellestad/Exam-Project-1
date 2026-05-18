//Loader//
showLoader()
window.addEventListener("load", () => {
    setTimeout(() => {
        hideLoader();
    }, 300)
})

const API_URL = "https://v2.api.noroff.dev/online-shop";
let products = [];

//Load cart items from localStorage, display them and calculate total price. Decrease and increase quantity of items in cart, and remove items from cart.
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const container = document.querySelector(".cart-items")
    const totalElement = document.getElementById("cartTotal")

    if (!container || !totalElement) {
        console.error("Cart container or total element not found.");
        return;
    }


    container.innerHTML = ""
    // Filter out invalid cart items (missing id or quantity)//
    const validCart = cart.filter(item => 
        item && 
        item.id &&
        item.title &&
        typeof item.price === "number" &&
        typeof item.quantity === "number" &&
        item.quantity > 0
    )

    // Update localStorage with valid cart items only//
    if (validCart.length !== cart.length) {
        localStorage.setItem("cart", JSON.stringify(validCart))
    }



    // If cart is empty, display message//
    if (validCart.length === 0) {
        container.innerHTML = '<p class="empty-cart"> Your cart is empty.</p>'
        totalElement.textContent = "Total sum: $0.00"
        return
    }

    let total = 0

    // Loop through cart items and create HTML elements for each item//
    validCart.forEach(item => {
        const productDiv = document.createElement("div")
        productDiv.className = "cart-item"

        productDiv.innerHTML = `
            <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.title}" class="cart-image">
            <div class="cart-info">
                <h3 class="cart-title">${item.title}</h3>
                <p class="cart-description">${item.description || 'No description available'}</p>
                <div class="quantity-controls">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </div>
                <div class="price-prices">
                    ${item.discountedPrice && item.discountedPrice < item.price ? `
                        <span class="cart-price-old">$${item.price.toFixed(2)}</span>
                        <span class="cart-price-new">$${item.discountedPrice.toFixed(2)}</span>
                    ` : `
                        <span class="cart-price-normal">$${item.price.toFixed(2)}</span>
                    `}
                </div>
                </div>
                <button class="remove-button" data-id="${item.id}"><i class="fa-regular fa-trash-can"></i></button>
            `

        // Calculate total price//
        container.appendChild(productDiv)
        const finalPrice = item.discountedPrice ?? item.price
        total += finalPrice * item.quantity
    });

    totalElement.textContent = `Total sum: $ ${total.toFixed(2)}`

 // Increase quantity of item in cart//
    container.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id")
            changeQuantity(id, 1)
        })
    })

    // Decrease quantity of item in cart//
    container.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id")
            changeQuantity(id, -1)
        })
    })

    // Remove item from cart//
    container.querySelectorAll(".remove-button").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id")
            removeFromCart(id)
        })
    })
}

// Change quantity of item in cart//
function changeQuantity(id, amount) {
    showLoader()
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    const item = cart.find(item => item.id == id)
    if (!item) return

    item.quantity += amount
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id)
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    loadCart()
    updateCartCount()
    hideLoader()
}

// Remove item from cart//
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart = cart.filter(item => item.id != id)
    localStorage.setItem("cart", JSON.stringify(cart))
    loadCart()
    updateCartCount()
}

// Checkout button click event to lead you to checkout page, and clear cart after checkout//
function checkoutButton() {
    const checkOutButton = document.getElementById("checkoutButton")
    if (checkOutButton) {
        checkOutButton.textContent = "Check Out"
        checkOutButton.addEventListener("click", () => {
            window.location.href = "checkout.html"
            loadCart()
            updateCartCount()
        })
    }
}

// Initialize cart page//
document.addEventListener("DOMContentLoaded", () => {
    showLoader()
    loadCart()
    hideLoader()
    updateCartCount()
    checkoutButton()
})