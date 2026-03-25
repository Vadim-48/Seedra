import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {initFilterDropdown} from "@/js/modules/all-products/filter-dropdown.js";
import {
    initMenuCategoryScroll,
    initCategoryDropdown,
} from "@/js/modules/menu-category.js";
import {initAccordionForm} from "@/js/modules/all-products/accordion-form.js";
import {loadProductsFirebase} from "@/js/modules/product-firebase.js";
import {initCardFilter} from "@/js/modules/all-products/card-filter.js";
import {initRangeSlider} from "@/js/modules/all-products/range-slider.js";


document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    initMenuCategoryScroll();
    initFilterDropdown();
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
        // initCardFilter(),
    ]);
    initCardFilter();

    initRangeSlider();
});

const cardProduct = document.querySelectorAll("[data-product-id]");


cardProduct.forEach(product => {
    const btn = product.querySelector(".card__button");
    // const productId = product.querySelector("[data-product-firebase]");
    btn.addEventListener("click", function(event) {
        event.preventDefault();
        console.log(product.dataset);
    });
})

// function handler(event) {
//     event.preventDefault();
//     console.log("clicked");
// }

// import {collection, getDocs} from "firebase/firestore";
// import {query, where} from "firebase/firestore";
// import {db} from "@/firebase/firebase.js";


// const formInputListEl = document.querySelectorAll("input");
// const cardListEl = document.querySelectorAll('[data-product-id]');
// const cardsListEl = document.querySelectorAll('[data-product-firebase]');
// console.log("jhgjgjkjhk",cardsListEl);
// cardsListEl.forEach((el) => {
//     console.log("fddfsd",el.dataset.productFirebase);
// })
// console.log(cardsListEl.dataset);

// formInputListEl.forEach(input => {
//     input.addEventListener("input", async () => {
//         const inputCheckedListEl = [...formInputListEl]
//             .filter(el => el.checked)
//             // .map(el => el.value && el.name)
//             .map(el => el.value)
//         console.log(inputCheckedListEl)
//         //
//         const productsFirebase = collection(db, "products");
//         const q = query(productsFirebase, where("seedType", "in", inputCheckedListEl));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             console.log(doc.id, ' => ', doc.data());
//
//         });
//
//     });
//
// });


