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
import {addLocalStorage} from "@/js/modules/add-local-storage.js";
import {loadReviewFirebase} from "@/js/modules/reviews-firebase.js";


document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();
    initMenuCategoryScroll();
    initFilterDropdown();
    initCategoryDropdown();
    initAccordionForm();

    const productsToLoad = [
        { id: "card-1", path: "product-1" },
        { id: "card-2", path: "product-2" },
        { id: "card-3", path: "product-3" },
        { id: "card-4", path: "product-4" },
        { id: "card-5", path: "product-5" },
        { id: "card-6", path: "product-6" },
        { id: "card-7", path: "product-7" },
        { id: "card-8", path: "product-8" },
        { id: "card-9", path: "product-9" },
    ];

    await Promise.all([
        ...productsToLoad.map(p => loadProductsFirebase(p.id, p.path)),
    ]);
    addLocalStorage();

    initRangeSlider();
});

// const cardProduct = document.querySelectorAll("[data-product-id]");
// let cadsStorageArr = JSON.parse(localStorage.getItem('cart')) || [];
// // let cadsStorageArr =  [];
//
// cardProduct.forEach(product => {
//     const btn = product.querySelector(".card__button");
//     // const productId = product.querySelector("[data-product-firebase]");
//
//     btn.addEventListener("click", function(event) {
//         event.preventDefault();
//         console.log(Object.values(product.dataset));
//
//         const value = { ...product.dataset};
//         const productId = product.dataset.productId;
//
//         const exists = cadsStorageArr.some(item => item[0] ===productId);
//         if (!exists) {
//             cadsStorageArr.push(value);
//             localStorage.setItem('cart', JSON.stringify(cadsStorageArr));
//         }
//
//         // localStorage.setItem('cart', JSON.stringify(cadsStorageArr))
//         // cadsStorageArr.push(Object.values(product.dataset));
//         console.log("dgdf",cadsStorageArr);
//     });
// })


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


