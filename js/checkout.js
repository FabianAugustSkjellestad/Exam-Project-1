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

