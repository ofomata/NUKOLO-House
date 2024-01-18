
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


const sliderImages = document.querySelectorAll(".slide");
const arrowLeft = document.querySelector("#left-arrow");
const arrowRight = document.querySelector("#right-arrow");

let currentSlideIndex = 0;
let slideInterval;

function resetSlides() {
    sliderImages.forEach((slide) => {
        slide.style.display = "none";
    });
}

function showSlide(index) {
    resetSlides();
    sliderImages[index].style.display = "block";
}

function showPreviousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + sliderImages.length) % sliderImages.length;
    showSlide(currentSlideIndex);
}

function showNextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % sliderImages.length;
    showSlide(currentSlideIndex);

    // If we reach the end, loop back to the beginning
    if (currentSlideIndex === 0) {
        currentSlideIndex = 0;
    }
}

arrowLeft.addEventListener("click", showPreviousSlide);
arrowRight.addEventListener("click", showNextSlide);

function startAutoSlide() {
    slideInterval = setInterval(showNextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Initialize slider
function startSlide() {
    showSlide(currentSlideIndex);
    startAutoSlide();
}

// Stop auto slide when user interacts with the slider
sliderImages.forEach((slide) => {
    slide.addEventListener("mouseenter", stopAutoSlide);
    slide.addEventListener("mouseleave", startAutoSlide);
});

startSlide();





