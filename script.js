
const menu = document.querySelector(".fa-bars");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
    if (menu.classList.contains("fa-bars")) {
        nav.classList.add('open-nav');
        menu.classList.replace("fa-bars", "fa-xmark");
    } else {
        nav.classList.remove('open-nav')
        menu.classList.replace("fa-xmark", "fa-bars");
    }
});


let currentIndex = 0;
    let autoSlideInterval;

    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const sliderContainer = document.getElementById('slider-container');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
                setTimeout(() => slide.style.opacity = '1', 10);
            } else {
                slide.style.opacity = '0';
                setTimeout(() => slide.style.display = 'none', 1);
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    sliderContainer.addEventListener('mouseover', stopAutoSlide);
    sliderContainer.addEventListener('mouseout', startAutoSlide);

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Initial display
    showSlide(currentIndex);
    startAutoSlide();



    document.addEventListener('DOMContentLoaded', function () {
        const formElement = document.getElementById("newsletterform");
        const subscribeBtn = document.querySelector(".news-btn");
        const loadingIndicator = document.querySelector(".loading-indicator");
        const errorMessageDiv = document.getElementById("errorMessage");
        const resultDiv = document.getElementById("subscription-result");
        const emailInput = document.querySelector(".email");
    
        subscribeBtn.addEventListener("click", (event) => {
            // Prevent default form submission
            event.preventDefault();
    
            // Hide previous error message
            errorMessageDiv.textContent = "";
    
            // Display loading indicator
            loadingIndicator.style.display = "block";
    
            // Client-side validation
            if (!formElement.checkValidity()) {
                // Display error message
                errorMessageDiv.textContent = "Please enter a valid email address.";
    
                // Hide loading indicator
                loadingIndicator.style.display = "none";
                return;
            }
    
            // Simulate asynchronous subscription
            setTimeout(() => {
                // Simulate a successful subscription
                resultDiv.textContent = "Welcome aboard! Your subscription brings a warm and flavorful touch to our coffee family.";
    
                // Clear the input field
                emailInput.value = "";
    
                // Hide loading indicator
                loadingIndicator.style.display = "none";
    
                // Clear the success message after 3 seconds (adjust the time as needed)
                setTimeout(() => {
                    resultDiv.textContent = "";
                }, 4000);
            }, 1000); // Simulate a 1-second delay (replace with an actual asynchronous request)
        });
    });
    
    
    




