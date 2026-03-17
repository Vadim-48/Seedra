import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {initAccordionForm} from "@/js/modules/all-products/accordion-form.js";
import {loadProductsFirebase} from "@/js/modules/product-firebase.js";
import {initCardFilter} from "@/js/modules/all-products/card-filter.js";

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
        initCardFilter(),
    ]);


});

// const inputSearchEl = document.querySelectorAll('[data-search-form] input');
// inputSearchEl.addEventListener("input", (e) => {
//
// })



// import {collection, getDocs} from "firebase/firestore";
// import {db} from "@/firebase/firebase.js";
//
// const productsSnapshot = await getDocs(collection(db, "products"));
// const productDataList = {};
// productsSnapshot.forEach((doc) => {
//     // productDataList[doc.id] = doc.data().seedType;
//     const data = doc.data();
//     productDataList[doc.id] = {
//         seedType: data.seedType,
//         featureType: data.featureType,
//         growingType: data.growingType,
//         characteristicType: data.characteristicType,
//         useType: data.useType,
//     };
// })
// delete productDataList.main;
// console.log("productDataList", productDataList);
//
//
// const formInputListEl = document.querySelectorAll(".filter-form input");
// const cardListEl = document.querySelectorAll('[data-product-id]');
// console.log("formInputListEl", formInputListEl);
// console.log("cardListEl", cardListEl);
//
// formInputListEl.forEach(input => {
//     input.addEventListener("change", () => {
//         const inputCheckedListEl = [...formInputListEl]
//             .filter(el => el.checked)
//         // .map(el => el.value && el.name)
//
//
//         const inputSeedList = inputCheckedListEl.filter(el => el.name == "seedType")
//             .map(el => el.value);
//         const inputFeaturedList = inputCheckedListEl.filter(el => el.name == "featureType")
//             .map(el => el.value);
//         const inputGrowingList = inputCheckedListEl.filter(el => el.name == "growingType")
//             .map(el => el.value);
//         const inputUseList = inputCheckedListEl.filter(el => el.name == "useType")
//             .map(el => el.value);
//         const inputCharacteristicList = inputCheckedListEl.filter(el => el.name == "characteristicType")
//             .map(el => el.value);
//         // console.log("inputSeedList", inputSeedList);
//         // console.log("inputSeedList", inputFeaturedList);
//         // console.log("inputSeedList", inputGrowingList);
//         // console.log("inputSeedList", inputUseList);
//         // console.log("inputSeedList", inputCharacteristicList);
//
//
//
//
//             // cardListEl
//             cardListEl.forEach(card => {
//                 let key = card.dataset.productFaerbase;
//                 const product = productDataList[key];
//
//                 let foundSeedType = false;
//                 let foundFeaturedType = false;
//                 let foundGrowingType = false;
//                 let foundUseType = false;
//                 let foundCharacteristicType = false;
//
//                 if (inputSeedList.includes(product.seedType)) {
//                     foundSeedType = true;
//                 }
//                 if (inputFeaturedList.includes(product.featureType)) {
//                     foundFeaturedType = true;
//                 }
//                 if (inputGrowingList.includes(product.growingType)) {
//                     foundGrowingType = true;
//                 }
//                 if (inputUseList.includes(product.useType)) {
//                     foundUseType = true;
//                 }
//                 if (inputCharacteristicList.includes(product.characteristicType)) {
//                     foundCharacteristicType = true;
//                 }
//
//
//                 console.log("dsssssssf",card.dataset.productFaerbase);
//                 if (card.dataset.productFaerbase === key) {
//                     if ((foundSeedType || (inputSeedList.length == 0))
//                         && (foundFeaturedType || (inputFeaturedList.length == 0))
//                         && (foundGrowingType || (inputGrowingList.length == 0))
//                         && (foundUseType || (inputUseList.length == 0))
//                         && (foundCharacteristicType || (inputCharacteristicList.length == 0))) {
//                         card.style.display = "grid";
//                     } else {
//                         card.style.display = "none";
//                     }
//                 }
//             });
//
//     })
// })


