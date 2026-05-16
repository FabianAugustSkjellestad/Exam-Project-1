//Loader//
window.addEventListener("load", () => {
    setTimeout(() => {
        hideLoader();
    }, 300)
});

//Load cart items from localStorage, display them and calculate total price. Decrease and increase quantity of items in cart, and remove items from cart.
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const cartContainer = document.getElementById("cart-container")
    const totalPriceElement = document.getElementById("cart-total")

    cartContainer.innerHTML = ""
    // If cart is empty, display message//
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>"
        totalPriceElement.textContent = "Total: $0.00"
        return
    }

    let totalPrice = 0
    // Loop through cart items and create HTML elements for each item//
    cart.forEach((item => {
        const productDiv = document.createElement("div")
        productDiv.classList.add("cart-item")

        productDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-image">
            <div class="cart-details">
                <h3 class="cart-title">${item.title}</h3>
                <p class="cart-description">${item.description}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <div class="cart-price">
                $${item.discountedPrice && item.discountedPrice < item.price
                    ? `
                        <span class="original-price">$${item.price}</span>
                        <span class="discounted-price">$${item.discountedPrice}</span>
                        `
                        : `<span class="cart-price-normal">$${item.price}</span>
                        `
                    }
                </div>
            </div>
            <button class="remove-btn" data-id="${item.id}"><i class="fa-regular fa-trash-can"></i></button>
        `
        // Calculate total price//
        cartContainer.appendChild(productDiv)
        const finalPrice = item.discountedPrice ?? item.price
        totalPrice += finalPrice * item.quantity
    }))
    totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`

 // Increase quantity of item in cart//
    cartContainer.querySelectorAll(".quantity-btn.increase").forEach(button => {
        button.addEventListener("click", () => {
            const id = e.target.getAttribute("data-id")
            changeQuantity(id, 1)
        })
    })

    // Decrease quantity of item in cart//
    cartContainer.querySelectorAll(".quantity-btn.decrease").forEach(button => {
        button.addEventListener("click", () => {
            const id = e.target.getAttribute("data-id")
            changeQuantity(id, -1)
        })
    })

    // Remove item from cart//
    cartContainer.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => {
            const id = e.target.getAttribute("data-id")
            removeFromCart(id)
        })
    })
}

// Change quantity of item in cart//
function changeQuantity(id, amount) {
    showLoader()
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    const item = cart.find(i => i.id === id)
    if (item) return

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
    cart = cart.filter(i => i.id !== id)
    localStorage.setItem("cart", JSON.stringify(cart))
    loadCart()
    updateCartCount()
}

// Checkout button click event//
function checkoutButton() {
    const checkoutButton = document.getElementById("checkout-button")
    if (checkoutButton) {
        checkoutButton.textContent = "Check Out"
        checkoutButton.addEventListener("click", () => {
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