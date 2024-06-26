// Open and Close Menu for Mobile Device

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


// Newsletter Form Validation

// const newsletterForm = document.querySelector(".newsletter-form");
const newsletterInput = document.querySelector("#newsletter-email");
const newsletterButton = document.querySelector(".newsletter-button");
const newsletterError = document.querySelector(".error-message");

newsletterButton.addEventListener("click", (e) => {

    let isValid = true;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

    if (newsletterInput.value === "") {
        newsletterError.textContent = "Email is Required";
        isValid = false;
    } else if (!newsletterInput.value.match(pattern)) {
        newsletterError.textContent = "Valid Email is Required";
        isValid = false;
    } else {
        newsletterError.textContent = "";
    }

    if (!isValid) {
        e.preventDefault();
    }
});


// Show More Reviews

if (window.location.pathname === "/shop.html") {
    const showReviewBtn = document.querySelector(".more-review-btn");
    const moreReviews = document.querySelector(".hide");
    const removeButton = document.querySelector(".more-reviews");

    showReviewBtn.addEventListener("click", () => {
        moreReviews.style.display = "block";
        removeButton.remove();
    });
}


// Accordion Toggle

const question = document.querySelectorAll(".faq-content");

question.forEach((questions) => {
    const icon = questions.querySelector(".fa-plus");
    questions.addEventListener("click", () => {
        questions.classList.toggle("active");

        if (icon.classList.contains("fa-plus")) {
            icon.classList.replace("fa-plus", "fa-minus");
        } else {
            icon.classList.replace("fa-minus", "fa-plus");
        }
    });
});



// Home Hero Banner Slide Display

document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.getElementById('slider-container');

    if (sliderContainer) {
        let currentIndex = 0;
        let autoSlideInterval;

        const slides = sliderContainer.querySelectorAll('.slide');
        const prevButton = sliderContainer.querySelector('#prev');
        const nextButton = sliderContainer.querySelector('#next');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('visible');
                    slide.classList.remove('hidden');
                } else {
                    slide.classList.add('hidden');
                    slide.classList.remove('visible');
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
    }
});




// Home Top Ad Slide Display

document.addEventListener('DOMContentLoaded', function() {
    const adContainer = document.getElementById('ad-container');

    if (adContainer) {
        let newCurrentIndex = 0;
        let newAutoSlideInterval;

        const ads = adContainer.querySelectorAll('.ad');

        function showAd(index) {
            ads.forEach((ad, i) => {
                if (i === index) {
                    ad.classList.add('visible');
                    ad.classList.remove('hidden');
                } else {
                    ad.classList.add('hidden');
                    ad.classList.remove('visible');
                }
            });
        }

        function nextAd() {
            newCurrentIndex = (newCurrentIndex + 1) % ads.length;
            showAd(newCurrentIndex);
        }

        function prevAd() {
            newCurrentIndex = (newCurrentIndex - 1 + ads.length) % ads.length;
            showAd(newCurrentIndex);
        }

        function startAutoAd() {
            newAutoSlideInterval = setInterval(nextAd, 5000);
        }

        function stopAutoAd() {
            clearInterval(newAutoSlideInterval);
        }

        adContainer.addEventListener('mouseover', stopAutoAd);
        adContainer.addEventListener('mouseout', startAutoAd);

        // Initial display
        showAd(newCurrentIndex);
        startAutoAd();
    }
});


// Add Items To Cart

document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".cart");
    const closeCart = document.querySelector(".close");
    const listCartHTML = document.querySelector(".listcart");
    const iconCartSpan = document.querySelector(".cart span");

    if (!cartIcon || !closeCart || !listCartHTML || !iconCartSpan) {
        console.error("One or more required elements are missing.");
        return;
    }

    // Load cart from local storage
    let carts = JSON.parse(localStorage.getItem("cart")) || [];

    // Predefined list of products from the shop page
    const products = [
        {
            id: "1",
            name: "Cafe Milano - Chiapas, MX",
            description: "Premium Meduim Roast | 100% Arabica",
            image: "image/aphotos (1).JPG",
            price: 25.00
        },
        {
            id: "2",
            name: "Cafe Dulce Crema - Oaxaca, MX",
            description: "Premium Dark Roast | 100% Arabica",
            image: "image/aphotos (19).JPG",
            price: 35.00
        },
        {
            id: "3",
            name: "Decaf - Veracruz, MX",
            description: "Premium Roast | 100% Arabica",
            image: "image/decaf coffee.jpeg",
            price: 20.00
        },
        {
            id: "4",
            name: "NH Tee Shirt",
            description: "Crafted with premium materials and featuring our iconic logo, it’s the perfect blend of comfort and style.",
            image: "image/tee shirt (2).png",
            price: 25.00
        },
        {
            id: "5",
            name: "NH Tote Bag",
            description: "Crafted with durable materials and featuring our signature logo, this tote bag is perfect for carrying your essentials in style.",
            image: "image/apparel.jpeg",
            price: 40.00
        },
        {
            id: "6",
            name: "NH Hats",
            description: "Designed for comfort and flair, these hats are perfect for any adventure.",
            image: "image/nh hat original.png",
            price: 20.00
        },
    ];

    const findProductById = (id) => {
        return products.find(product => product.id === id);
    };

    cartIcon.addEventListener("click", () => {
        document.body.classList.add("showcart");
        updateCartHTML();  // Ensure the cart updates when opened
    });

    closeCart.addEventListener("click", () => {
        document.body.classList.remove("showcart");
    });

    document.querySelectorAll(".shop-now").forEach(button => {
        button.addEventListener("click", (event) => {
            let productElement = event.target.closest(".category-content-box, .main-coffee-details");
            if (productElement) {
                let productId = productElement.dataset.id;
                let product = findProductById(productId);
                if (product) {
                    addToCart(product.id, product.name, product.description, product.image, product.price);
                } else {
                    console.error("Product not found in predefined list.");
                }
            } else {
                console.error("Product element not found.");
            }
        });
    });

    const addToCart = (productId, productName, productDescription, productImage, productPrice) => {
        let positionInCart = carts.findIndex(item => item.productId === productId);
        if (positionInCart >= 0) {
            carts[positionInCart].quantity++;
        } else {
            carts.push({
                productId: productId,
                name: productName,
                description: productDescription,
                image: productImage,
                price: productPrice,
                quantity: 1
            });
        }
        updateCartHTML();
        saveCartToLocalStorage();
    };

    const updateCartHTML = () => {
        listCartHTML.innerHTML = "";
        let totalQuantity = 0;

        carts.forEach(cartItem => {
            totalQuantity += cartItem.quantity;

            let cartItemHTML = `
                <div class="item" data-id="${cartItem.productId}">
                    <div class="imagecart">
                        <img src="${cartItem.image}" alt="">
                    </div>
                    <div class="cart-control">
                        <div class="name">
                            ${cartItem.name}
                        </div>
                        <div class="description">
                            ${cartItem.description}
                        </div>
                        <div class="quantity">
                            <span class="minus fa-solid fa-minus"></span>
                            <span>${cartItem.quantity}</span>
                            <span class="plus fa-solid fa-plus"></span>
                        </div>
                    </div>
                    <div class="totalprice">
                        $${(cartItem.price * cartItem.quantity).toFixed(2)}
                    </div>
                </div>
            `;
            listCartHTML.innerHTML += cartItemHTML;
        });

        iconCartSpan.textContent = totalQuantity;
    };

    listCartHTML.addEventListener("click", (event) => {
        if (event.target.classList.contains("minus") || event.target.classList.contains("plus")) {
            let productId = event.target.closest(".item").dataset.id;
            let action = event.target.classList.contains("plus") ? "plus" : "minus";
            changeQuantity(productId, action);
        }
    });

    const changeQuantity = (productId, action) => {
        let cartItemIndex = carts.findIndex(item => item.productId === productId);

        if (cartItemIndex >= 0) {
            if (action === "plus") {
                carts[cartItemIndex].quantity++;
            } else if (action === "minus") {
                carts[cartItemIndex].quantity--;
                if (carts[cartItemIndex].quantity <= 0) {
                    carts.splice(cartItemIndex, 1);
                }
            }
        }
        updateCartHTML();
        saveCartToLocalStorage();
    };

    const saveCartToLocalStorage = () => {
        localStorage.setItem("cart", JSON.stringify(carts));
    };

    const initApp = () => {
        // Initialize the cart HTML on page load
        updateCartHTML();
    };

    initApp();
});





document.addEventListener("DOMContentLoaded", () => {
    const listCartHTML = document.querySelector(".listcart");
    const iconCartSpan = document.querySelector(".cart span");
    const addToCartButton = document.querySelector(".add-to-cart");
    const cartIcon = document.querySelector(".cart");
    let selectedBundles = [];

    if (!listCartHTML || !iconCartSpan || !addToCartButton) {
        console.error("One or more required elements are missing.");
        return;
    }

    // Load cart from local storage
    let carts = JSON.parse(localStorage.getItem("cart")) || [];

    cartIcon.addEventListener("click", () => {
        document.body.classList.add("showcart");
        updateCartHTML();  // Ensure the cart updates when opened
    });

    // Function to add item to cart
    const addToCart = (productId, productName, productDescription, productImage, productPrice, productQuantity) => {
        let positionInCart = carts.findIndex(item => item.productId === productId);
        if (positionInCart >= 0) {
            carts[positionInCart].quantity += productQuantity;
            carts[positionInCart].price += productPrice * productQuantity; // Update total price
        } else {
            carts.push({
                productId: productId,
                name: productName,
                description: productDescription,
                image: productImage,
                price: productPrice * productQuantity, // Initialize price based on quantity
                quantity: productQuantity
            });
        }
        updateCartHTML();
        saveCartToLocalStorage();
    };

    // Function to update the cart HTML
    const updateCartHTML = () => {
        listCartHTML.innerHTML = "";
        let totalQuantity = 0;

        carts.forEach(cartItem => {
            totalQuantity += cartItem.quantity;

            let cartItemHTML = `
                <div class="item" data-id="${cartItem.productId}">
                    <div class="imagecart">
                        <img src="${cartItem.image}" alt="">
                    </div>
                    <div class="cart-control">
                        <div class="name">
                            ${cartItem.name}
                        </div>
                        <div class="description">
                            ${cartItem.description}
                        </div>
                        <div class="quantity">
                            <span class="minus fa-solid fa-minus" data-id="${cartItem.productId}"></span>
                            <span>${cartItem.quantity}</span>
                            <span class="plus fa-solid fa-plus" data-id="${cartItem.productId}"></span>
                        </div>
                    </div>
                    <div class="totalprice">
                        $${(cartItem.price).toFixed(2)}
                    </div>
                </div>
            `;
            listCartHTML.innerHTML += cartItemHTML;
        });

        iconCartSpan.textContent = totalQuantity;
    };

    // Function to handle quantity changes
    const changeQuantity = (productId, action) => {
        let cartItemIndex = carts.findIndex(item => item.productId === productId);

        if (cartItemIndex >= 0) {
            if (action === "plus") {
                carts[cartItemIndex].quantity++;
                carts[cartItemIndex].price += carts[cartItemIndex].price / (carts[cartItemIndex].quantity-1);
            } else if (action === "minus") {
                if (carts[cartItemIndex].quantity > 1) {
                    carts[cartItemIndex].quantity--;
                    carts[cartItemIndex].price -= carts[cartItemIndex].price / (carts[cartItemIndex].quantity+1);
                } else {
                    carts.splice(cartItemIndex, 1);
                }
            }
        }
        updateCartHTML();
        saveCartToLocalStorage();
    };

    // Save cart to local storage
    const saveCartToLocalStorage = () => {
        localStorage.setItem("cart", JSON.stringify(carts));
    };

    // Add event listener to add to cart button
    addToCartButton.addEventListener("click", () => {
        if (selectedBundles.length > 0) {
            let totalBundlePrice = 0;
            let bundleDescriptions = [];

            selectedBundles.forEach(bundle => {
                let bundleElement = bundle.closest(".coffee-bundle-div");
                let bundleText = bundleElement.querySelector(".item-price").textContent;
                let bundlePrice = parseFloat(bundleText.match(/\$(\d+\.?\d*)/)[1]);
                
                totalBundlePrice += bundlePrice;
                bundleDescriptions.push(bundleText);
            });

            let productName = "Coffee Bundle";
            let productDescription = bundleDescriptions.join(", ");
            let productImage = document.querySelector(".coffee-bag-image img").src;

            addToCart("bundle-combined", productName, productDescription, productImage, totalBundlePrice, 1);

            selectedBundles = []; // Clear selected bundles after adding to cart
            document.querySelectorAll(".coffee-bundle-div.checked").forEach(item => {
                item.classList.remove("checked");
            });
        } else {
            console.error("No bundle selected.");
        }
    });

    // Add event listener to bundle items
    const items = document.querySelectorAll(".coffee-bundle-div");
    items.forEach((item) => {
        item.addEventListener("click", () => {
            item.classList.toggle("checked");
            let checkIcon = item.querySelector(".check-icon");

            if (item.classList.contains("checked")) {
                selectedBundles.push(checkIcon);
            } else {
                selectedBundles = selectedBundles.filter(bundle => bundle !== checkIcon);
            }
        });
    });

    // Initialize the app
    const initApp = () => {
        updateCartHTML();
    };

    initApp();

    // Update cart immediately after adding a product
    addToCartButton.addEventListener("click", updateCartHTML);

    // Event delegation for plus and minus buttons in the cart
    listCartHTML.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("plus")) {
            const productId = target.getAttribute("data-id");
            changeQuantity(productId, "plus");
        } else if (target.classList.contains("minus")) {
            const productId = target.getAttribute("data-id");
            changeQuantity(productId, "minus");
        }
    });
});


const items = document.querySelectorAll(".grind-type");

items.forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
    });
})


const orderType = document.querySelectorAll(".order-type");

orderType.forEach((item) => {
    item.addEventListener("click", () => {
        // Uncheck all items first
        orderType.forEach((i) => i.classList.remove("checked"));
        
        // Then check the clicked item
        item.classList.toggle("checked");
    });
});







// Show Sub Nav for Location Tab

// const locationTab = document.querySelector(".location-nav");
// const subTab = document.querySelector(".sub-nav");

// locationTab.addEventListener("click", () => {
//     subTab.classList.toggle("active");
// });

// const passwordLink = document.querySelector(".location-nav");
// const passwordModal = document.querySelector(".location-modal");
// // const closeModal = document.querySelector(".close-password");

// passwordLink.addEventListener("click", () => {
//     // e.preventDefault();
//     passwordModal.classList.toggle("active");
// });

// closeModal.addEventListener("click", () => {
//     passwordModal.style.display = "none";
// });






// const toTop = document.querySelector(".top-btn");

// window.addEventListener("scroll", checkHeight);

// function checkHeight() {
//     if (window.scrollY > 200) {
//         toTop.style.display = "flex";
//     } else {
//         toTop.style.display = "none";
//     }
// }

// function scrollToTop() {
//     const scrollInterval = setInterval(() => {
//         if (window.scrollY === 0) {
//             clearInterval(scrollInterval);
//         } else {
//             window.scrollBy(0, -15);
//         }
//     }, 16);
// }

// toTop.addEventListener("click", () => {
//     scrollToTop();
// });



// let currentIndex = 0;
// let autoSlideInterval;

// const slides = document.querySelectorAll('.slide');
// const prevButton = document.getElementById('prev');
// const nextButton = document.getElementById('next');
// const sliderContainer = document.getElementById('slider-container');

// function showSlide(index) {
//     slides.forEach((slide, i) => {
//         if (i === index) {
//             slide.style.display = 'block';
//             setTimeout(() => slide.style.opacity = '1', 10);
//         } else {
//             slide.style.opacity = '0';
//             setTimeout(() => slide.style.display = 'none', 1);
//         }
//     });
// }

// function nextSlide() {
//     currentIndex = (currentIndex + 1) % slides.length;
//     showSlide(currentIndex);
// }

// function prevSlide() {
//     currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//     showSlide(currentIndex);
// }

// function startAutoSlide() {
//     autoSlideInterval = setInterval(nextSlide, 5000);
// }

// function stopAutoSlide() {
//     clearInterval(autoSlideInterval);
// }

// if (window.location.pathname === "/home.html") {
//     sliderContainer.addEventListener('mouseover', stopAutoSlide);
//     sliderContainer.addEventListener('mouseout', startAutoSlide);

//     // Event listeners
//     prevButton.addEventListener('click', prevSlide);
//     nextButton.addEventListener('click', nextSlide);

//     // Initial display
//     showSlide(currentIndex);
//     startAutoSlide();
// }

    
// document.addEventListener('DOMContentLoaded', function () {
//     const formElement = document.getElementById("newsletterform");
//     const subscribeBtn = document.querySelector(".news-btn");
//     const loadingIndicator = document.querySelector(".loading-indicator");
//     const errorMessageDiv = document.getElementById("errorMessage");
//     const resultDiv = document.getElementById("subscription-result");
//     const emailInput = document.querySelector(".email");

//     subscribeBtn.addEventListener("click", (event) => {
//         console.log("Event listener triggered!");
//         // Prevent default form submission
//         event.preventDefault();

//         // Hide previous error message
//         errorMessageDiv.textContent = "";

//         // Display loading indicator
//         loadingIndicator.style.display = "block";

//         // Client-side validation
//         if (!formElement.checkValidity()) {
//             // Display error message
//             errorMessageDiv.textContent = "Please enter a valid email address.";

//             // Hide loading indicator
//             loadingIndicator.style.display = "none";
//             return;
//         }

//         // Simulate asynchronous subscription
//         setTimeout(() => {
//             // Simulate a successful subscription
//             resultDiv.textContent = "Welcome aboard! Your subscription brings a warm and flavorful touch to our coffee family.";

//             // Clear the input field
//             emailInput.value = "";

//             // Hide loading indicator
//             loadingIndicator.style.display = "none";

//             // Clear the success message after 3 seconds (adjust the time as needed)
//             setTimeout(() => {
//                 resultDiv.textContent = "";
//             }, 4000);
//         }, 1000); // Simulate a 1-second delay (replace with an actual asynchronous request)
//     });
// });


// const gridItems = document.querySelectorAll('.community-image-container');
    
// gridItems.forEach(function (item) {
//     item.addEventListener('mouseover', function () {
//         showText(item);
//     });

//     item.addEventListener('mouseout', function () {
//         hideText(item);
//     });
// });

// function showText(element) {
//     element.querySelector('.hover-text').style.opacity = 1;
// }

// function hideText(element) {
//     element.querySelector('.hover-text').style.opacity = 0;
// }

    
    
// const faqButtons = document.querySelectorAll(".question-container");

// let openAnswer = null;

// faqButtons.forEach((faqButton) => {
//     const answer = faqButton.nextElementSibling;
//     const icon = faqButton.querySelector(".fa-plus");

//     faqButton.addEventListener("click", () => {
//         if (openAnswer && openAnswer !== answer) {
//             // Close the currently open answer
//             openAnswer.style.display = "none";
//             const openIcon = openAnswer.previousElementSibling.querySelector(".fa-minus");
//             if (openIcon) {
//                 openIcon.classList.replace("fa-minus", "fa-plus");
//             }
//         }

//         if (answer.style.display === "none" || answer.style.display === "") {
//             // Open the clicked answer
//             answer.style.display = "block";
//             icon.classList.replace("fa-plus", "fa-minus");
//             openAnswer = answer;
//         } else {
//             // Close the clicked answer
//             answer.style.display = "none";
//             icon.classList.replace("fa-minus", "fa-plus");
//             openAnswer = null;
//         }
//     });
// });




// if (window.location.pathname === "/home.html") {
// const instagramBtn = document.querySelector(".hover-text");
// const postCloseBtn = document.querySelector(".close-post");
// const post = document.querySelector(".insta-post");

// instagramBtn.addEventListener("click", () => {
//     post.style.display = "block"
// });

// postCloseBtn.addEventListener("click", () => {
//     post.style.display = "none"
// })

// }



// if (window.location.pathname === "/login.html") {
// const passwordLink = document.querySelector(".forgot-password-link");
// const passwordModal = document.querySelector(".recovery-password-modal");
// const closeModal = document.querySelector(".close-password");

// passwordLink.addEventListener("click", (e) => {
//     e.preventDefault();
//     passwordModal.style.display = "block";
// });

// closeModal.addEventListener("click", () => {
//     passwordModal.style.display = "none";
// });
// }



// if (window.location.pathname === "/login.html" || window.location.pathname === "/signup.html") {
// //Password Validation

// const passwordInput = document.getElementById("login-password");
// const eyeIcon = document.querySelector(".fa-eye");

// eyeIcon.addEventListener("click", () => {
//     passwordInput.type = passwordInput.type === "password" ? "text" : "password";
//     if (passwordInput.type === "password") {
//         eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
//     } else {
//         eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
//     }
// });

// }
