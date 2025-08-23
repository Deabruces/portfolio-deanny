const burger = document.querySelector(".menu-burger-button");
const menuBurger = document.querySelector(".nav-burger");

if (burger && menuBurger) {
    burger.addEventListener("click", () => {
        menuBurger.classList.toggle("active");
    });
}