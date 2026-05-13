const API_URL = "https://v2.api.noroff.dev/online-shop";

// Get the product ID from the URL parameters
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Function to fetch and create the product
async function fetchAndCreateProduct() {
    const container = document.getElementById("product-container");

    if (!container) {
        console.error("Product container not found.");
        return;
    }
    
    try {
        const productId = getProductIdFromUrl();
        if (!productId) {
            container.textContent = "Product ID not found.";
            return;
        }

        const response = await fetch(`${API_URL}/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const product = data.data;

        if (!product) {
            container.textContent = "Product not found.";
            return;
        }

        const imageUrl = product.image && product.image.url ? product.image.url : "https://via.placeholder.com/150";

        // Clear the container before adding the product details
        container.innerHTML = "";

        const productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        productDetails.innerHTML = `
            <img src="${imageUrl}" alt="${product.title}" class="product-image">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
        `;

        container.appendChild(productDetails);
    }
    catch (error) {
        console.error("Failed to fetch product details:", error);
        container.textContent = "Failed to load product details. Please try again later.";
    }
}

// Call the function to fetch and create the product when the page loads
document.addEventListener("DOMContentLoaded", fetchAndCreateProduct);