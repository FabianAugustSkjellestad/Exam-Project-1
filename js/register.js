//Loader//
showLoader()
window.addEventListener("load", () => {
    setTimeout(() => {
        hideLoader()
    }, 300)
})

const form = document.getElementById("register-form")
const nameInput = form.name
const nameError = document.querySelector(".name-error")

// Validation to check if the name is valid //
nameInput.addEventListener("blur", () => {
    const value = nameInput.value.trim()

    if (!/^[A-Za-z0-9_]{3,15}$/.test(value)) {
        nameError.textContent = "Name must be 3-15 characters long and can only contain letters, numbers, and underscores."
        nameInput.classList.add("input-error")
        nameInput.classList.remove("input-success")
    } else {
        nameError.textContent = ""
        nameInput.classList.remove("input-error")
        nameInput.classList.add("input-success")
    }
})

const emailInput = form.email
const emailError = document.querySelector(".email-error")

// Validation to check if the email is valid //
emailInput.addEventListener("blur", () => {
    const email = emailInput.value

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Only stud.noroff.no emails are allowed to register and login."
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

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters long and include at least one letter and one number."
        passwordInput.classList.add("input-error")
        passwordInput.classList.remove("input-success")
    } else {
        passwordError.textContent = ""
        passwordInput.classList.remove("input-error")
        passwordInput.classList.add("input-success")
    }
})

// Register function //
form.addEventListener("submit", async (event) => {
    event.preventDefault()
    showLoader()

    const name = form.name.value
    const email = form.email.value
    const password = form.password.value

    const username = email.split("@")[0]

    //POST request to the API to register the user //
    try {
        const response = await fetch("https://v2.api.noroff.dev/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: form.name.value,
                email: form.email.value,
                password: form.password.value,

            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "An error occurred while registering.")
        } 

        window.location.href = "login.html"
    } catch (error) {
        document.querySelector(".form-error").textContent = error.message
    } finally {
        hideLoader()
    }
})