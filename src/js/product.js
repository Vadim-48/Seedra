import { burger } from "@/js/modules/burger.js";
import { burgerAccordion } from "@/js/modules/burger-accordion.js";
// import { initAsideSwiper } from "@/js/modules/swiper-one-news.js";
// import { loadProductsFirebase } from "@/js/modules/product-firebase.js";
// import { loadProductsFirebase } from "@/js/modules/product-firebase.js";

import { loadHeroProductsFirebase } from "@/js/modules/hero-product-firebase.js";
import { initProductSwiper } from "@/js/modules/swiper-hero-product.js";
import {loadProductsFirebase} from "@/js/modules/product-firebase.js";
import {loadReviewFirebase} from "@/js/modules/reviews-firebase.js";


document.addEventListener("DOMContentLoaded", async() => {

    burger();

    burgerAccordion();

    // await loadProductsFirebase("product_hero-card","product-5");
    await Promise.all([
        loadHeroProductsFirebase("product_hero-card","product-5"),

        loadReviewFirebase("card-review-1", "review-1"),
        loadReviewFirebase("card-review-2", "review-2"),
    ]);

    initProductSwiper();

    // initAsideSwiper();
});


const accordionList = document.querySelectorAll(".faq__accordion-head");

accordionList.forEach(item => {
    item.addEventListener("click", function () {
        const clickItem = this;
        accordionList.forEach(element => {
            if (element !== clickItem) {
                element.parentElement.classList.remove("active");
            }
        });
        item.parentElement.classList.toggle("active");
        let currentItem = item.parentElement.querySelector(".faq__accordion-body");
        if (item.parentElement.classList.contains("active")) {
            currentItem.style.maxHeight = currentItem.scrollHeight + "px";
        } else {
            currentItem.style.maxHeight = 0;
        }
    });
});


