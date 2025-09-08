const burgerButton = document.querySelector('[data-button="menu"]');

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("active");
});