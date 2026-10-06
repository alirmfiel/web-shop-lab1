const checkoutForm = document.querySelector("#checkout-form");
const orderMessage = document.querySelector(".order-message");

checkoutForm.addEventListener("submit", event => {
    event.preventDefault();

    orderMessage.textContent = "Заказ создан!";

    localStorage.removeItem("cart");

    checkoutForm.reset();
});