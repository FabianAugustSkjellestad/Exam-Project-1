const API_URL = "https://v2.api.noroff.dev/online-shop";

// Get the product ID from the URL parameters
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Function to fetch and create the product
async function fetchAndCreateProduct() {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (!id) {
            container.textContent = "Product ID not provided.";
            return;
        }

        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        const product = data.data;

        if (!product) {
            container.textContent = "Product not found.";
            return;
        }
        