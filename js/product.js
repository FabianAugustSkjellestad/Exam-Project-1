const API_URL = "https://v2.api.noroff.dev/online-shop/";

// Get the product ID from the URL parameters
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Function to show the loader
function showLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.remove("hidden");
    }
}

// Function to hide the loader
function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("hidden");
    }
}

// Function to fetch single product details
async function fetchProductDetails(productId) {
    try {
        showLoader();
        const response = await fetch(`${API_URL}products/${productId}`);
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

