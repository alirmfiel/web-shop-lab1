const buttons = document.querySelectorAll(".product-card button");
const cartCount = document.querySelector("#cart-count");

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    cartCount.textContent = count;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".product-card");

        const id = card.dataset.id;
        const name = card.querySelector("h3").textContent;

        const price = Number(
            card
                .querySelector(".product-price")
                .textContent
                .replace(/[^\d]/g, "")
        );

        const image = card.querySelector("img").getAttribute("src");

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const product = cart.find(item => item.id === id);

        if (product) {
            product.quantity += 1;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        const oldText = button.textContent;

        button.textContent = "Добавлено";
        button.disabled = true;

        setTimeout(() => {
            button.textContent = oldText;
            button.disabled = false;
        }, 800);
    });
});

updateCartCount();