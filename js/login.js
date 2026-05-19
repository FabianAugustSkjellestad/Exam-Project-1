//Loader//
showLoader()
window.addEventListener("load", () => {
    setTimeout(() => {
        hideLoader()
    }, 300)
})

// Function to get to the cart-page //
function goToCart(page) {
    const pathParts = window.location.pathname.split('/')
    pathParts.pop()
    if (pathParts[pathParts.length - 1] === "account") {
        pathParts.pop()
    }
    const newPath = pathParts.join('/') + '/' + page
    window.location.href = newPath
}

// Get form and input elements //
const form = document.getElementById("loginForm")

const emailInput = form.email
const emailError = document.querySelector(".email-error")

// Validation to check if the email is valid //
emailInput.addEventListener("blur", () => {
    const email = emailInput.value

    if (!/^[^\s@]+@stud\.noroff\.no$/.test(email)) {
        emailError.textContent = "Please enter a valid email address. Only stud.noroff.no emails are allowed to register and login."
        emailInput.classList.add("input-error")
        emailInput.classList.remove("input-success")
    } else {
        emailError.textContent = ""
        emailInput.classList.remove("input-error")
        emailInput.classList.add("input-success")
    }
})

const passwordInput = form.password
const passwordError = document.querySelector(".password-error")

// Validation to check if the password is valid //
passwordInput.addEventListener("blur", () => {
    const password = passwordInput.value

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
        passwordInput.classList.add("input-error")
        passwordInput.classList.remove("input-success")
    } else {
        passwordError.textContent = ""
        passwordInput.classList.remove("input-error")
        passwordInput.classList.add("input-success")
    }
})

// Login function //
form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const email = form.email.value
    const password = form.password.value
    showLoader()

    // Send login request to the server //
    try {
        const response = await fetch("https://v2.api.noroff.dev/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Login failed. Please enter valid credentials. Only stud.noroff.no emails are allowed to register and login.")
        }

        // Store the token and user information in localStorage //
        localStorage.setItem("token", data.accessToken)
        setTimeout(() => {
            hideLoader()

            const redirectPage = localStorage.getItem("redirectToCart") || "/cart.html"
            localStorage.removeItem("redirectToCart")
            goToCart(redirectPage)
        }, 500)
    } catch (error) {
        hideLoader()
        document.querySelector(".login-error").textContent = error.message
    }
})

// Check if the user is already logged in, if so, it hides the login form and shows logged in-message and log out button //

const token = localStorage.getItem("token")
const loggedInMessage = document.getElementById("loggedInMessage")
const logoutButton = document.getElementById("logoutButton")

if (token) {
    form.style.display = "none"
    loggedInMessage.style.display = "block"
}

// Logout function //
logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token")
    window.location.reload()
})