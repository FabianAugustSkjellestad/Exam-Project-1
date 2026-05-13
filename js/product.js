const API_URL = "https://v2.api.noroff.dev/online-shop/";

// Get the product ID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Function to fetch product details from the API
async function fetchProductDetails() {
    try {
        const response = await fetch(`${API_URL}products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayProductDetails(data);
    }
    catch (error) {
        console.error("Failed to fetch product details:", error);
        const productDetailsContainer = document.getElementById("product-details");
        productDetailsContainer.innerHTML = "<p class='error-message'>Failed to load product details. Please try again later.</p>";
    }
}

// Function to display product details on the page
function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById("product-details");
    const imageUrl = product.image && product.image
        .url ? product.image.url : "https://via.placeholder.com/300";
    productDetailsContainer.innerHTML = `
        <div class="product-image-container">
            <img src="${imageUrl}" alt="${product.title}" class="product-image">
        </div>
        <div class="product-info-container">
            <h1 class="product-title">${product.title}</h1>
            <p class="product-description">${product.description}</p>

            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        </div>
    `;
}

// Call the function to fetch and display product details when the page loads
fetchProductDetails();