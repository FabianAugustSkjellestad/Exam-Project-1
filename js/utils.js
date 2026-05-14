// Function to show the loader
    function showLoader() {
    const loader = document.getElementById("loader");
    if (loader)
        loader.classList.remove("hidden");
    }


// Function to hide the loader
function hideLoader() {
    const loader = document.getElementById("loader");
    if (loader)
        loader.classList.add("hidden");
    }