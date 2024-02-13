
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


const toTop = document.querySelector(".top-btn");

window.addEventListener("scroll", checkHeight);

function checkHeight() {
    if (window.scrollY > 200) {
        toTop.style.display = "flex";
    } else {
        toTop.style.display = "none";
    }
}

function scrollToTop() {
    const scrollInterval = setInterval(() => {
        if (window.scrollY === 0) {
            clearInterval(scrollInterval);
        } else {
            window.scrollBy(0, -15);
        }
    }, 16);
}

toTop.addEventListener("click", () => {
    scrollToTop();
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

if (window.location.pathname === "/home.html") {
    sliderContainer.addEventListener('mouseover', stopAutoSlide);
    sliderContainer.addEventListener('mouseout', startAutoSlide);

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Initial display
    showSlide(currentIndex);
    startAutoSlide();
}

    
document.addEventListener('DOMContentLoaded', function () {
    const formElement = document.getElementById("newsletterform");
    const subscribeBtn = document.querySelector(".news-btn");
    const loadingIndicator = document.querySelector(".loading-indicator");
    const errorMessageDiv = document.getElementById("errorMessage");
    const resultDiv = document.getElementById("subscription-result");
    const emailInput = document.querySelector(".email");

    subscribeBtn.addEventListener("click", (event) => {
        console.log("Event listener triggered!");
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


document.addEventListener('DOMContentLoaded', function () {
    const gridItems = document.querySelectorAll('.connect-item');
    
    gridItems.forEach(function (item) {
        item.addEventListener('mouseover', function () {
        showText(item);
        });
    
        item.addEventListener('mouseout', function () {
        hideText(item);
        });
    });
    });
    
    function showText(element) {
    element.querySelector('.hover-text').style.opacity = 1;
    }
    
    function hideText(element) {
    element.querySelector('.hover-text').style.opacity = 0;
    }

    
    
const faqButtons = document.querySelectorAll(".question-container");

let openAnswer = null;

faqButtons.forEach((faqButton) => {
    const answer = faqButton.nextElementSibling;
    const icon = faqButton.querySelector(".fa-plus");

    faqButton.addEventListener("click", () => {
        if (openAnswer && openAnswer !== answer) {
            // Close the currently open answer
            openAnswer.style.display = "none";
            const openIcon = openAnswer.previousElementSibling.querySelector(".fa-minus");
            if (openIcon) {
                openIcon.classList.replace("fa-minus", "fa-plus");
            }
        }

        if (answer.style.display === "none" || answer.style.display === "") {
            // Open the clicked answer
            answer.style.display = "block";
            icon.classList.replace("fa-plus", "fa-minus");
            openAnswer = answer;
        } else {
            // Close the clicked answer
            answer.style.display = "none";
            icon.classList.replace("fa-minus", "fa-plus");
            openAnswer = null;
        }
    });
});


if (window.location.pathname === "/home.html") {
const instagramBtn = document.querySelector(".hover-text");
const postCloseBtn = document.querySelector(".close-post");
const post = document.querySelector(".insta-post");

instagramBtn.addEventListener("click", () => {
    post.style.display = "block"
});

postCloseBtn.addEventListener("click", () => {
    post.style.display = "none"
})

}




const passwordLink = document.querySelector(".forgot-password-link");
const passwordModal = document.querySelector(".recovery-password-modal");
const closeModal = document.querySelector(".close-password");

passwordLink.addEventListener("click", (e) => {
    e.preventDefault();
    passwordModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    passwordModal.style.display = "none";
});




