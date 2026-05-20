//Loader//
showLoader()
window.onLoad = () => {
    hideLoader()
}

//When the user clicks on card, cardfields will be shown. When click on vipps, cardfields will be hidden//
document.addEventListener("DOMContentLoaded", () => {
    const cardOption = document.querySelector("input[value='card']")
    const vippsOption = document.querySelector("input[value='vipps']")
    const cardFields = document.getElementById("card-fields")

    function updateCardFields() {
        if (cardOption.checked) {
            cardFields.classList.remove("hidden")
        } else {
            cardFields.classList.add("hidden")
        }
    }

    cardOption.addEventListener("change", updateCardFields)
    vippsOption.addEventListener("change", updateCardFields)
    updateCardFields()

    setTimeout(() => {
        hideLoader()
    }, 300)
})

const checkoutForm = document.getElementById("checkoutForm")
checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault()

    showLoader()

    setTimeout(() => {
        hideLoader()

        localStorage.removeItem("cart")
        window.location.href = "success.html"
    }, 600)
})

// Payment info validation //
const cardNumber = document.getElementById("cardNumber")
const cardNumberError = document.querySelector(".cardNumber-error")

const expiry = document.getElementById("cardExpirydate")
const expiryError = document.querySelector(".expiry-error")

const cvc = document.getElementById("cardCVC")
const cvcError = document.querySelector(".cvc-error")

cardNumber.addEventListener("blur", () => {
    if (!/^\d{16}$/.test(cardNumber.value)) {
        cardNumberError.textContent = "Card number must be 16 digits."
        cardNumber.classList.add("input-error")
        cardNumber.classList.remove("input-success")
    } else {
        cardNumberError.textContent = ""
        cardNumber.classList.remove("input-error")
        cardNumber.classList.add("input-success")
    }
})

expiry.addEventListener("blur", () => {
    if (!/^\d{2}\/\d{2}$/.test(expiry.value)) {
        expiryError.textContent = "Expiry date must be in MM/YY format."
        expiry.classList.add("input-error")
        expiry.classList.remove("input-success")
    } else {
        expiryError.textContent = ""
        expiry.classList.remove("input-error")
        expiry.classList.add("input-success")
    }
})

cvc.addEventListener("blur", () => {
    if (!/^\d{3}$/.test(cvc.value)) {
        cvcError.textContent = "CVC must be 3 digits."
        cvc.classList.add("input-error")
        cvc.classList.remove("input-success")
    } else {
        cvcError.textContent = ""
        cvc.classList.remove("input-error")
        cvc.classList.add("input-success")
    }
})

