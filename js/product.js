const API_URL = "https://v2.api.noroff.dev/online-shop";

// Get the product ID from the URL parameters
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

