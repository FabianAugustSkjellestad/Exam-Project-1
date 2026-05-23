//Loader//
window.addEventListener("load", () => {
    setTimeout(() => {
        hideLoader();
    }, 300)
});

// Base URL for the API
const API_URL = "https://v2.api.noroff.dev/online-shop";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Function to get product
async function getProduct() { 
    showLoader();
    if (!productId) {
        console.error("Product ID not found in URL.");
        document.getElementById("product-container").innerHTML = "<p class='error-message'>Product ID is missing in the URL.</p>";
        hideLoader();
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const product = data.data;

        await new Promise(resolve => setTimeout(resolve, 100))

        renderProduct(product);
    } catch (error) {
        console.error("Failed to fetch product:", error);
        document.getElementById("product-container").innerHTML = "<p class='error-message'>Failed to load product details. Please try again later.</p>";
    } finally {
        hideLoader();
    }
}

// Function to display product details
function renderProduct(product) {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""

    const imageDiv = document.createElement("div");
    const image = document.createElement("img");
    const detailsDiv = document.createElement("div");
    const title = document.createElement("h1");
    const description = document.createElement("p");
    const priceDiv = document.createElement("div");
    const price = document.createElement("span");
    const discountedPrice = document.createElement("span");
    const rating = document.createElement("p");
    const tagList = document.createElement("ul");
    const shareSection = document.createElement("div");
    const shareButton = document.createElement("button");
    const shareInput = document.createElement("input");
    const shareMessage = document.createElement("span");
    const reviewList = document.createElement("ul");

    const reviewHeader = document.createElement("h2");
    reviewHeader.textContent = "Customer Reviews";
    reviewHeader.classList.add("reviews-header");

    imageDiv.className = "product-specific-image";
    image.className = "product-image";
    detailsDiv.className = "product-specific-details";
    title.className = "product-title";
    description.className = "product-description";
    priceDiv.className = "product-specific-prices";
    price.className = "product-price";
    discountedPrice.className = "product-discounted-price";
    rating.className = "product-rating";
    tagList.className = "product-tags";
    shareSection.className = "share-section";
    shareButton.className = "copy-button";
    shareInput.className = "share-url";
    shareMessage.className = "copy-message hidden";
    reviewList.className = "product-reviews";

    image.src = product.image && product.image.url ? product.image.url : "https://via.placeholder.com/300";
    image.alt = product.title;
    title.textContent = product.title;
    description.textContent = product.description;

    if (product.discountedPrice < product.price) {
        price.textContent = `$${product.price.toFixed(2)}`
        discountedPrice.textContent = `$${product.discountedPrice.toFixed(2)}`
        price.classList.add("original-price")
        discountedPrice.classList.add("discounted-price")
    } else {
        price.textContent = `$${product.price.toFixed(2)}`
    }

    rating.innerHTML = createRatingStars(product.rating);

    if (Array.isArray(product.tags) && product.tags.length > 0) {
        product.tags.forEach(tag => {
            const li = document.createElement("li")
            li.textContent = tag
            tagList.appendChild(li)
        })
    } else {
        const li = document.createElement("li");
        li.textContent = "No tags available."
        li.classList.add("no-info")
        tagList.appendChild(li)
    }

    if (Array.isArray(product.reviews) && product.reviews.length > 0) {
        product.reviews.forEach(review => {
            const li = document.createElement("li")
            li.textContent = `${review.username || "Anonymous"}: "${review.description}" (${review.rating}/5)`
            reviewList.appendChild(li)
        })
    } else {
        const li = document.createElement("li")
        li.textContent = "Not reviewed yet."
        li.classList.add("no-info")
        reviewList.appendChild(li)
    }

    shareInput.type = "text"
    shareInput.readOnly = true
    shareInput.value = window.location.href
    shareInput.id = "shareUrl"
    shareInput.name = "shareUrl"
    shareButton.innerHTML = `<i class="fa-solid fa-share-from-square"></i>`
    shareMessage.textContent = "Link copied to clipboard!"

    shareButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(shareInput.value)
            shareMessage.classList.remove("hidden")
            setTimeout(() => {
                shareMessage.classList.add("hidden")
            }, 2000)
            } catch (error) {
                console.error("Failed to copy link:", error)
            }
        })

        const addToCartButton = document.createElement("button");
        addToCartButton.className = "add-to-cart-button"
        addToCartButton.textContent = "Add to Cart"

        //If user tries to add item to cart while NOT logged in, you will get redirected to the login page. If user is logged in, the item will be added to the cart and you will get a confirmation message.
        addToCartButton.addEventListener("click", () => {
            const token = localStorage.getItem("token")
            if (!token) {
                window.location.href = "../account/login.html"
                return
            }
            addToCart(product)
        })

        imageDiv.appendChild(image)
        priceDiv.appendChild(price)
        if (discountedPrice.textContent) priceDiv.appendChild(discountedPrice)
            shareSection.append(shareButton, shareInput, shareMessage)

        detailsDiv.append(
            title,
            description,
            priceDiv,
            rating,
            tagList,
            shareSection,
            addToCartButton,
            reviewHeader,
            reviewList
        )

        productContainer.append(imageDiv, detailsDiv)
}

    getProduct()

    // Number rating is converted to stars, but shows number as well for accessibility reasons. Star rating is returned as a string of HTML
function createRatingStars(rating) {
    if (!rating) return "<p class='no-info'>No rating available.</p>"

    const maxStars = 5
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0)

    let starsHtml = ""

    for (let i = 0; i < fullStars; i++) {
        starsHtml += `<i class="fa-solid fa-star"></i>`
    }

    if (hasHalfStar) {
        starsHtml += `<i class="fa-solid fa-star-half-stroke"></i>`
    }

    for (let i = 0; i < emptyStars; i++) {
        starsHtml += `<i class="fa-regular fa-star"></i>`
    }

    return `<div class="rating-stars">${starsHtml}<span class="rating-number">${rating.toFixed(1)} / 5</span></div>`
}

// Function to add product to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    const existing = cart.find(item => item.id === product.id)

    if (existing) {
        existing.quantity += 1
    } else {
        cart.push({ 
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            discountedPrice: product.discountedPrice,
            image: product.image?.url || null,
            quantity: 1
        })
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    updateCartCount()
    showCartToast()
}

// Function to show a toast notification when item is added to cart
function showCartToast() {
    const toast = document.getElementById("cart-toast")
    toast.classList.remove("hidden")
    toast.classList.add("show")
    setTimeout(() => {
        toast.classList.remove("show")
    }, 5000)
}

document.addEventListener("DOMContentLoaded", () => {
    getProduct()
    const toast = document.getElementById("cart-toast")
    const continueBtn = document.querySelector(".toast-continue")
    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            toast.classList.remove("show")
        })
    }
})