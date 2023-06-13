import { iosVhFix } from "./utils/ios-vh-fix";
import { initSelects } from "./modules/select/init-selects";

// ---------------------------------

window.addEventListener("DOMContentLoaded", () => {
  iosVhFix();

  window.addEventListener("load", () => {
    initSelects();
  });

  const burger = document.querySelector(".header__burger");
  const header = document.querySelector(".header");
  burger.addEventListener("click", () => {
    header.classList.toggle("header--open");
  });
});
