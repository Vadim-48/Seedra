import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {initCategoryDropdown} from "@/js/modules/menu-category-dropdown.js";
import {initAccordionForm} from "@/js/modules/all-products/accordion-form.js";
import {loadProductsFirebase} from "@/js/modules/product-firebase.js";
import {initCardFilter} from "@/js/modules/all-products/card-filter.js";
import {initRangeSlider} from "@/js/modules/all-products/range-slider.js";


document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    initCategoryDropdown();
    initAccordionForm();

    await Promise.all([
        loadProductsFirebase("card-1", "product-1"),
        loadProductsFirebase("card-2", "product-2"),
        loadProductsFirebase("card-3", "product-3"),
        loadProductsFirebase("card-4", "product-4"),
        loadProductsFirebase("card-5", "product-5"),
        loadProductsFirebase("card-6", "product-6"),
        loadProductsFirebase("card-7", "product-1"),
        loadProductsFirebase("card-8", "product-2"),
        loadProductsFirebase("card-9", "product-3"),
        initCardFilter(),
    ]);

    initRangeSlider();
});


// const menuCategoryEl = document.querySelector('[data-menu-category]');
// const btnList = menuCategoryEl.querySelectorAll('.category__btn');
// // const dropdownWrap = menuCategoryEl.querySelector('.category__dropdown-list');
// const dropdownListEl = menuCategoryEl.querySelectorAll('.category-dropdown');
// // const doc = document;
// console.log(dropdownListEl);
//
// btnList.forEach((btn, index) => {
//     btn.addEventListener("click", (e) => {
//         dropdownListEl.forEach(el => {
//             el.classList.remove('open');
//         })
//         dropdownListEl[index].classList.add('open');
//     })
// })
//
// document.addEventListener("click", (e) => {
//     if (!menuCategoryEl.contains(e.target)) {
//         dropdownListEl.forEach(el => {
//             el.classList.remove('open');
//         })
//     }
// })




// const inputSearchEl = document.querySelector('[data-search-form] input');
// const cardsListEl = document.querySelectorAll('[data-product-id]');
// // const cardsPriceListEl = document.querySelectorAll('[data-product-price]');
// // console.log("cardsNameListEl", cardsNameListEl);
//
// const cardList = []
// cardsListEl.forEach(el => {
//     const name = el;
//     const nameValue = el.querySelector('[data-product-name]').textContent;
//     cardList[el] = nameValue;
// })
//
// console.log("cardList", cardList);
//
//
// // console.log("cardsNameLis", cardsNameLis);
//
// inputSearchEl.addEventListener("input", (e) => {
//     // console.log("inputSearchEl", e.target.value);
//     // cardListEl.forEach(card => {
//     //     console.log("inputSearchEldsf", card.dataset.productName.textContent);
//     // })
// })


