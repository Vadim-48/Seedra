import {burger} from "@/js/modules/burger.js";
import {initAccordionForm} from "@/js/modules/all-products/accordion-form.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {loadProductsFirebase} from "@/js/modules/product-firebase.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();

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
    ]);
});

import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

const productsSnapshot = await getDocs(collection(db, "products"));
const productDataList = {};
productsSnapshot.forEach((doc) => {
    productDataList[doc.id] = doc.data().seedType;
})
console.log("productDataList", productDataList);


const formInputListEl = document.querySelectorAll(".filter-form input");
const cardListEl = document.querySelectorAll('[data-product-id]');
console.log("gf", cardListEl);

// const cardsFilter = cardListEl.filter((card) => card == "hybrid")
let cardsFilter = [];
for (const key in productDataList) {
    cardsFilter = productDataList.filter((card) => card == "hybrid");
}
// const cardsFilter = cardListEl.filter((card) =>
// {
//     for (const key in productDataList) {
//        productDataList[key]
//     }
// })
console.log("cardsFilter", cardsFilter);

// formInputListEl.forEach(input => {
//     // console.log("type.value", input);
//     input.addEventListener("change", (event) => {
//         // console.log("type.value", event);
//         if (event.target.checked) {
//             for (const key in productDataList) {
//                 // if (productDataList[key] == input.value) {}
//                 console.log("sss", input.value);
//                 let productDataFilter = productDataList[key].filter((item) => !input.value);
//                 console.log("sss", productDataFilter);
//             }
//         }
//     })})


            // console.log("true");
            // for (const key in productDataList) {
            //     if (productDataList[key] == input.value) {
            //         if (cardListEl.dataset.productFaerbase == key) {
            //             console.log("input.value");
            //         }
            //         // console.log("input.value", cardListEl.dataset.productFaerbase);
            //     }
            // }
        // } else {
        //     console.log("false");
        // }
        //     for (const key in productDataList) {
        //         // console.log("card", productDataList[key]);
        //         // console.log("el.value", el.value);
        //         cardListEl.forEach(card => {
        //
        //
        //
        //             if (productDataList[key] == type.value) {
        //                 console.log("card", productDataList[key]);
        //
        //                 card.style.display = "none";
        //                 console.log("card", card, productDataList[key], type.value);
        //             }
        //         })
        //     }


            // for (const key in productDataList) {
            //     if (productDataList[key] == el.value) {
            //         console.log("true", key);
            //
            //         // console.log(el.value);
            //         cardListEl.forEach(card => {
            //             card.style.display = "none";
            //             console.log("card", card);
            //         })
            //     }
            // }
        // }
//     })
// })


// formInputListEl.forEach(el => {
//     el.addEventListener("change", (el) => {
//         for (const key in productDataList) {
//            if (productDataList[key] == el.value) {
//                console.log("true", key);
//                if (el.target.checked) {
//                    // console.log(el.value);
//                    cardListEl.forEach(card => {
//                        card.style.display = "none";
//                        console.log("card", card);
//                    })
//                }
//            }
//         }
//     })
// })


// for (const key in filterInputList) {
//     filterInputList[key].addEventListener("change", (event) => {
//         if (event.target.checked) {
//             console.log(filterInputList[key]);
//         }
//     })
// }

// formInputListEl.forEach(el => {
//     el.addEventListener("change", (event) => {
//
//         console.log("formInputListEl.forEach", el);
//
//         // if (event.target.checked) {
//         // }
//         // for (const key in filterInputList) {
//         //     if (event.target.checked) {
//         //
//         //     }
//         //     if (filterInputList[key] == el.value) {
//         //         console.log(key, filterInputList[key]);
//         //     }
//         // }
//
//         if (event.target.checked) {
//             console.log(key, filterInputList[key]);
//             // for (const key in filterInputList) {
//             //     if (filterInputList[key] == el.value) {
//             //         console.log(key, filterInputList[key]);
//             //
//             //         // cardListEl.forEach((cardEl) => {
//             //         //     cardEl
//             //         // })
//             //
//             //
//             //
//             //         // const cardEl = document.querySelector(`[data-product-id=${key}]`);
//             //         // console.log(cardEl);
//             //     }
//             // }
//         }
//
//     })
// })

