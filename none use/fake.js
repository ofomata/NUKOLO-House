const cartIcon = document.querySelector(".cart");
const showCart = document.querySelector("body");
const closeCart = document.querySelector(".close");
let listProductHTML = document.querySelector(".category-content");
let listCartHTMl = document.querySelector(".listcart");
let iconCartSpan = document.querySelector(".cart span");


let listProducts = [];
let carts = [];

cartIcon.addEventListener("click", () => {
    showCart.classList.add("showcart");
});

closeCart.addEventListener("click", () => {
    showCart.classList.remove("showcart");
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = "";
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement("div");
            newProduct.classList.add("category-content-box");
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <div class="product-info">
                    <div class="left-content">
                        <p class="coffee-name">${product.name}</p>
                        <small class="coffee-info">${product.description}</small>
                    </div>
                    <div class="right-content">
                        <button class="shop-now">Shop</button>
                    </div>
                </div>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}
listProductHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("shop-now")) {
        let product_id = positionClick.parentElement.parentElement.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]   
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem("cart", JSON.stringify(carts));
}

const addCartToHTML = () => {
    listCartHTMl.innerHTML = "";
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach((cart) => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement("div");
            newCart.classList.add("item");
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
                <div class="imagecart">
                    <img src="${info.image}" alt="">
                </div>
                <div class="cart-control">
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="quantity">
                        <span class="minus fa-solid fa-minus"></span>
                        <span class="">${cart.quantity}</span>
                        <span class="plus fa-solid fa-plus"></span>
                    </div>
                </div>
                <div class="totalprice">
                    $${info.price * cart.quantity}
                </div>
            `;

            listCartHTMl.appendChild(newCart);
        })
    }
    iconCartSpan.textContent = totalQuantity;
}

listCartHTMl.addEventListener("click", (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains("minus") || positionClick.classList.contains("plus")){
        let product_id = positionClick.parentElement.parentElement.parentElement.dataset.id;
        let type = "minus";
        if(positionClick.classList.contains("plus")){
            type = "plus";
        }
        changeQuantity(product_id, type);
    }
})

const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        switch (type) {
            case "plus":
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
        
            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data from json
    fetch("product.json")
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML();

            if (localStorage.getItem("cart")) {
                carts = JSON.parse(localStorage.getItem("cart"));
                addCartToHTML();
            }
        })
}

initApp();



// Add Items To Cart

document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".cart");
    const showCart = document.querySelector("body");
    const closeCart = document.querySelector(".close");
    let listCartHTML = document.querySelector(".listcart");
    let iconCartSpan = document.querySelector(".cart span");

    let carts = [];

    cartIcon.addEventListener("click", () => {
        showCart.classList.add("showcart");
    });

    closeCart.addEventListener("click", () => {
        showCart.classList.remove("showcart");
    });

    document.querySelectorAll(".shop-now").forEach(button => {
        button.addEventListener("click", (event) => {
            let productElement = event.target.closest(".category-content-box");
            if (productElement) {
                let productId = productElement.dataset.id;
                addToCart(productId);
            } else {
                console.error("Product element not found.");
            }
        });
    });

    const addToCart = (productId) => {
        let positionInCart = carts.findIndex(item => item.productId === productId);
        if (positionInCart >= 0) {
            carts[positionInCart].quantity++;
        } else {
            let productElement = document.querySelector(`.category-content-box[data-id="${productId}"]`);
            if (productElement) {
                let productName = productElement.querySelector(".coffee-name").textContent;
                let productDescription = productElement.querySelector(".coffee-info").textContent;
                carts.push({
                    productId: productId,
                    name: productName,
                    description: productDescription,
                    quantity: 1
                });
            } else {
                console.error("Product element not found.");
            }
        }
        updateCartHTML();
        saveCartToLocalStorage();
    };

    const updateCartHTML = () => {
        listCartHTML.innerHTML = "";
        let totalQuantity = 0;

        carts.forEach(cartItem => {
            let productElement = document.querySelector(`.category-content-box[data-id="${cartItem.productId}"]`);
            if (productElement) {
                let productImage = productElement.querySelector("img").src;
                let productName = productElement.querySelector(".coffee-name").textContent;
                let productDescription = productElement.querySelector(".coffee-info").textContent;
                let productPrice = parseFloat(productElement.querySelector(".coffee-price").textContent.replace('$', ''));

                totalQuantity += cartItem.quantity;

                let cartItemHTML = `
                    <div class="item" data-id="${cartItem.productId}">
                        <div class="imagecart">
                            <img src="${productImage}" alt="">
                        </div>
                        <div class="cart-control">
                            <div class="name">
                                ${productName}
                            </div>
                            <div class="description">
                                ${productDescription}
                            </div>
                            <div class="quantity">
                                <span class="minus fa-solid fa-minus"></span>
                                <span>${cartItem.quantity}</span>
                                <span class="plus fa-solid fa-plus"></span>
                            </div>
                        </div>
                        <div class="totalprice">
                            $${(productPrice * cartItem.quantity).toFixed(2)}
                        </div>
                    </div>
                `;
                listCartHTML.innerHTML += cartItemHTML;
            }
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

    const loadCartFromLocalStorage = () => {
        let storedCart = localStorage.getItem("cart");
        if (storedCart) {
            carts = JSON.parse(storedCart);
            updateCartHTML();
        }
    };

    const initApp = () => {
        loadCartFromLocalStorage();
    };

    initApp();
});
