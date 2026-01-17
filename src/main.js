import { app } from './firebase/firebase.js';
import { loadHeroProduct } from "./js/modules/hero.js";
// import { loadCardsProduct } from "./js/modules/cards-firebase.js";

import { burger } from "./js/modules/burger.js";
import { burgerAccordion } from "./js/modules/burger-accordion.js";

console.log('Firebase ready', app);

document.addEventListener("DOMContentLoaded", async() => {
    await loadHeroProduct();
    // await loadCardsProduct();


    burger();

    burgerAccordion();
});

// import { doc, getDoc } from "firebase/firestore";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/firebase/firebase.js";

// const docRef = doc(db, "products", "main");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
// } else {
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
// }

// const querySnapshot = await getDocs(collection(db, "products"));
// querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
// });



// import { doc, getDoc } from "firebase/firestore";
// const docRef = doc(db, "products", "product-1");
// const docSnap = await getDoc(docRef);
// const product = docSnap.data();
// console.log("Document data:", docSnap.data());
// console.log(product.price);

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


    if (!product.name || !product.price || !product.photo) return;
    console.log("product.img: ",product.photo);

    innerTitle.textContent = product.name;
    innerPrice.textContent = product.price;
    innerPhoto.src = product.photo;

    if (product.firePrice) innerFirePrice.style.display = "block";
    if (product.oldPrice) innerOldPrice.textContent = product.oldPrice;

}

loadCard("card-1","product-1");
loadCard("card-2","product-2");
loadCard("card-3","product-3");
loadCard("card-4","product-4");
loadCard("card-5","product-5");
loadCard("card-6","product-6");


