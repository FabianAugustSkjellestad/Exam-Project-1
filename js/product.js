const API_URL = "https://v2.api.noroff.dev/online-shop";

// Get the product ID from the URL parameters
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}


// Function to fetch single product details
async function fetchProductDetails(productId) {
    try {
        showLoader();
        const response = await fetch(`${API_URL}/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        hideLoader();
        return result.data;
    } catch (error) {
        console.error("Failed to fetch product details:", error);
        hideLoader();
        displayError("Failed to load product details. Please try again later.");
        return null;
    }
}

// Display error message
function displayError(message) {
    const productContainer = document.getElementById("product-details");
    productContainer.innerHTML = `
    <div class="error-container">
        <p class="error-message">${message}</p>
        <a href="index.html" class="back-home-btn">Back to Homepage</a>
    </div>
    `;
}

// Function to display product details
function displayProductDetails(product) {
    const productContainer = document.getElementById("product-details");
    if (!product) {
        displayError("Product not found.");
        return;
    }
    const imageUrl = product.image && product.image.url ? product.image.url : "https://via.placeholder.com/300";
    productContainer.innerHTML = `
    <div class="product-details">
        <img src="${imageUrl}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        </div>
    </div>
    `;
}

// Main function to initialize the product page
async function initProductPage() {
    const productId = getProductIdFromUrl();
    if (!productId) {
        displayError("No product ID provided in the URL.");
        return
    } else {
        const productDetails = await fetchProductDetails(productId);
        displayProductDetails(productDetails);
    }
}

// Initialize the product page when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initProductPage);