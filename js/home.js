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

// Function to display carousel with 3 products from the API. The carousel will automatically slide every 5 seconds and will also have navigation buttons for manual sliding. The carousel will be responsive and will display 1 product on mobile devices, 2 products on tablets, and 3 products on desktop devices. The carousel will also have a fade-in effect when sliding to the next product.
function displayCarousel() {
    const carouselContainer = document.getElementById("carousel-container");
    const carouselSlide = carouselContainer.querySelector(".carousel-slide");
    carouselSlide.innerHTML = ""; // Clear existing carousel items

    if (products.length === 0) {
        carouselSlide.innerHTML = "<p class='error-message'>No products available for the carousel.</p>";
        return;
    }

    const carouselProducts = products.slice(0, 3); // Get the first 3 products for the carousel

    carouselProducts.forEach((product, index) => {
        const imageUrl = product.image && product.image.url ? product.image.url : "https://via.placeholder.com/150";
        const productItem = document.createElement("div");
        productItem.classList.add("carousel-item");

        if (index === 0) {
            productItem.style.display = "block"; // Show the first item initially
        } else {
            productItem.style.display = "none"; // Hide other items
        }   

        productItem.innerHTML = `
            <img src="${imageUrl}" alt="${product.title}" class="carousel-image">
            <h3 class="carousel-title">${product.title}</h3>
            <p class="carousel-price">$${product.price.toFixed(2)}</p>
        `;
        carouselSlide.appendChild(productItem);
    }

    );

    // Initialize carousel functionality
    let currentIndex = 0;
    const totalItems = carouselProducts.length;

    function showCarouselItem(index) {
        const items = carouselSlide.querySelectorAll(".carousel-item");
        items.forEach((item, i) => {
            item.style.display = i === index ? "block" : "none";
        });
    }

    function nextCarouselItem() {
        currentIndex = (currentIndex + 1) % totalItems;
        showCarouselItem(currentIndex);
    }

    // Show the first item initially
    showCarouselItem(currentIndex);

    // Set up automatic sliding every 5 seconds
    setInterval(nextCarouselItem, 5000);
}

//Create navigation buttons for the carousel
const carouselContainer = document.getElementById("carousel-container");
const prevButton = document.createElement("button");
prevButton.classList.add("carousel-nav", "prev");
prevButton.innerHTML = "&#10094;";
const nextButton = document.createElement("button");
nextButton.classList.add("carousel-nav", "next");
nextButton.innerHTML = "&#10095;";
carouselContainer.appendChild(prevButton);
carouselContainer.appendChild(nextButton);

prevButton.setAttribute("aria-label", "Previous Slide");
nextButton.setAttribute("aria-label", "Next Slide");

// Add event listeners for navigation buttons
prevButton.addEventListener("click", () => {
    const items = carouselContainer.querySelectorAll(".carousel-item");
    let currentIndex = Array.from(items).findIndex(item => item.style.display === "block");
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    items.forEach((item, i) => {
        item.style.display = i === currentIndex ? "block" : "none";
    });
}
);

nextButton.addEventListener("click", () => {
    const items = carouselContainer.querySelectorAll(".carousel-item");
    let currentIndex = Array.from(items).findIndex(item => item.style.display === "block");
    currentIndex = (currentIndex + 1) % items.length;
    items.forEach((item, i) => {
        item.style.display = i === currentIndex ? "block" : "none";
    });
}
);

//Add swipe detection for mobile devices
let touchStartX = 0;
let touchEndX = 0;

carouselContainer.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
}
);

carouselContainer.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}
);

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Swipe left, go to next slide
        nextButton.click();
    }
    if (touchEndX > touchStartX) {
        // Swipe right, go to previous slide
        prevButton.click();
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
    displayCarousel();
}
// Call the initialization function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initHomepage);