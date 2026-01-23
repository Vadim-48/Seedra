import { app } from './firebase/firebase.js';
import { loadHeroProduct } from "./js/modules/hero.js";
// import { loadCardsProduct } from "./js/modules/cards-firebase.js";

import { burger } from "./js/modules/burger.js";
import { burgerAccordion } from "./js/modules/burger-accordion.js";
import { initSwipers } from "./js/modules/swiper.js";

console.log('Firebase ready', app);

document.addEventListener("DOMContentLoaded", async() => {
    await loadHeroProduct();
    // await loadCardsProduct();

    initSwipers();

    burger();

    burgerAccordion();
});


// ---------------cards-firebase-----------------
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.js";

const querySnapshot = await getDocs(collection(db, "products"));
const productsMap = {};
querySnapshot.forEach((doc) => {
    productsMap[doc.id] = doc.data();
})

const mainProduct = productsMap["main"];
console.log("main", mainProduct);


const loadCard = (idCard,idProduct) =>{
    const cardList = document.getElementById(idCard);
    console.log(cardList);
    const product = productsMap[idProduct];
    console.log("productsMap: ",product);

    const innerTitle = cardList.querySelector(".card__title");
    const innerPhoto = cardList.querySelector(".card__photo");
    const innerPrice = cardList.querySelector(".card__price");
    const innerOldPrice = cardList.querySelector(".card__old-price");
    const innerFirePrice = cardList.querySelector(".card__fire-price");


    console.log("hello");
    console.log("product.img: ",product.photo);

    if (product.name) innerTitle.textContent = product.name;
    if (product.price) innerPrice.textContent = product.price;
    if (product.photo) innerPhoto.src = product.photo;
    if (product.firePrice) innerFirePrice.style.display = "block";
    if (product.oldPrice) innerOldPrice.textContent = product.oldPrice;

}

loadCard("card-1","product-1");
loadCard("card-2","product-2");
loadCard("card-3","product-3");
loadCard("card-4","product-4");
loadCard("card-5","product-5");
loadCard("card-6","product-6");


// let swiper;
//
// function initSwiper() {
//     if (window.innerWidth < 576 && !swiper) {
//         swiper = new Swiper('.swiper', {
//             slidesPerView: 'auto',
//             spaceBetween: 16,
//             loop: true,
//             loopAdditionalSlides: 3,
//         });
//     } else if (window.innerWidth >= 576 && swiper) {
//         swiper.destroy(true, true);
//         swiper = null;
//     }
// }
//
// initSwiper();
// window.addEventListener('resize', initSwiper);
