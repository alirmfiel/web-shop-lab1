const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total span");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Корзина пуста</p>";
        cartTotal.textContent = "0 ₽";
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement("article");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">
                <h3>${item.name}</h3>

                <p>${item.price} ₽</p>

                <div class="quantity">
                    <button class="decrease" data-id="${item.id}">−</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </div>

                <button class="remove" data-id="${item.id}">
                    Удалить
                </button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    cartTotal.textContent = `${total} ₽`;
}

cartItems.addEventListener("click", event => {
    const id = event.target.dataset.id;

    if (!id) {
        return;
    }

    const product = cart.find(item => item.id === id);

    if (event.target.classList.contains("increase")) {
        product.quantity += 1;
    }

    if (event.target.classList.contains("decrease")) {
        if (product.quantity > 1) {
            product.quantity -= 1;
        }
    }

    if (event.target.classList.contains("remove")) {
        cart = cart.filter(item => item.id !== id);
    }

    saveCart();
    renderCart();
});

renderCart();