// This file is for the homepage of the website. It contains the code for the product feed and the carousel.

const API_URL = "https://v2.api.noroff.dev/online-shop";
let products = [];

// Function to fetch products from the API
async function fetchProductsData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        products = data.data.slice(0, 12); // Get the first 12 products
    }
    catch (error) {
        console.error("Failed to fetch products:", error);
        products = [];
    }
}

// Function for responsive thumbnail to display 12 products on the homepage
function displayProducts() {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Clear existing products

    if (products.length === 0) {
        productContainer.innerHTML = "<p class='error-message'>No products available at the moment.</p>";
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        const imageUrl = product.image && product.image.url ? product.image.url : "https://via.placeholder.com/150";
        const price = product.price || 0; // Default to 0 if price is missing

        productCard.innerHTML = `
            <img src="${product.image.url}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="view-product-btn">View Product</button>
        `;

        productContainer.appendChild(productCard);

        // Add click event listener to the "View Product" button
        const viewButton = productCard.querySelector(".view-product-btn");
        viewButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent the click from bubbling up to the product card
            window.location.href = `product.html?id=${product.id}`;
        });

        // Add click event listener to navigate to product details page
        productCard.addEventListener("click", () => {
            window.location.href = `product.html?id=${product.id}`;
        });
    }
    );
}

// Function to initialize the homepage
async function initHomepage() {
    await fetchProductsData();
    displayProducts();
}

// Call the initialization function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initHomepage);
