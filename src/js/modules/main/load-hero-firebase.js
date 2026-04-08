import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";
import {formatMoney} from "@/js/modules/format-money.js";

export async function loadHeroFirebase(productId) {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    })
    const product = productsMap[productId];

    const productHeroCard = document.querySelector('[data-product-id="card-hero"]');
    if (!productHeroCard) {return}
    productHeroCard.dataset.productId = productId;

    const innerTitle = productHeroCard.querySelector('[data-product-name]');
    const innerPrice = productHeroCard.querySelector('[data-product-price]');
    const innerOldPrice = productHeroCard.querySelector('[data-product-old-price]');
    const innerFirePrice = productHeroCard.querySelector('[data-product-fire-price]');
    const innerHeroPhoto = productHeroCard.querySelector('[data-product-hero-photo]');

    if (product.name && innerTitle) innerTitle.textContent = product.name;
    if (product.price != null && innerPrice != null) innerPrice.textContent = formatMoney(product.price);
    if (product.firePrice && innerFirePrice) innerFirePrice.classList.add("is-visible");
    if (product.oldPrice != null && innerOldPrice != null) innerOldPrice.textContent = formatMoney(product.oldPrice);
    if (product.heroPhoto && innerHeroPhoto) innerHeroPhoto.src = product.heroPhoto;


}