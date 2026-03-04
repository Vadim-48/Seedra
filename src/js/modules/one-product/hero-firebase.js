import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

export async function loadHeroProductsFirebase(dataCard, productId) {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    })

    const cardList = document.querySelector(`[data-product-id="${dataCard}"]`);
    const product = productsMap[productId];

    const innerTitle = cardList.querySelector('[data-product-name]');
    const innerPrice = cardList.querySelector('[data-product-price]');
    const innerOldPrice = cardList.querySelector('[data-product-old-price]');
    const innerFirePrice = cardList.querySelector('[data-product-fire-price]');

    if (product.name && innerTitle) innerTitle.textContent = product.name;
    if (product.price != null && innerPrice != null) innerPrice.textContent = "$" + product.price;
    if (product.firePrice && innerFirePrice) innerFirePrice.style.display = "block";
    if (product.oldPrice != null && innerOldPrice != null) innerOldPrice.textContent = "$" + product.oldPrice;

    const innerPhotoList = cardList.querySelectorAll('[data-product-photo]');
    const innerThumbsList = cardList.querySelectorAll('[data-product-thumb]');

    for (let i = 0; i < innerPhotoList.length; i++) {
        innerPhotoList[i].src = product.thumbs[i];
        innerThumbsList[i].src = product.thumbs[i];
    }

    const innerVideoWrapList = cardList.querySelectorAll('[data-product-video-wrap]');
    // console.log( "sfas",product.video.img);
    innerVideoWrapList.forEach(video => {
        video.src = product.video.img;
    })

    const innerDataVideoIdList = cardList.querySelectorAll('[data-video-id]');
    innerDataVideoIdList.forEach(el => {
        el.dataset.videoId = product.video.id;
    })
    console.log( "sfas",innerDataVideoIdList);

    const packCountRemoveEl = cardList.querySelector('.selector__number-remove');
    const packCountAddEl = cardList.querySelector('.selector__number-add');
    const packCountEl = cardList.querySelector('.selector__number-item');
    packCountRemoveEl.addEventListener('click', () => {
        let count = parseInt(packCountEl.textContent, 10);
        if (count > 0) {count -= 1;}
        packCountEl.textContent = count;
    })
    packCountAddEl.addEventListener('click', () => {
        let count = parseInt(packCountEl.textContent, 10);
        count += 1;
        packCountEl.textContent = count;
    })
    const packSelectListEl = cardList.querySelectorAll('.selector__input');
    const packChoseEl = cardList.querySelector('.selector__chose-number');
    packSelectListEl.forEach((el, index) =>{
    el.addEventListener('change', () => {
            packChoseEl.textContent = el.value + " pack";
        })
    })
}