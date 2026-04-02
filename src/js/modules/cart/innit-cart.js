import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

import {updateCartIcon} from "@/js/modules/update-header-icons.js";

function calcTotal() {
    const cartRawData = localStorage.getItem("cart");
    let cadsStorageArr = JSON.parse(cartRawData) || [];
    const totalPriceList = document.querySelectorAll("[data-product-total-price]");
    const innerTotalPrice = document.querySelectorAll("[data-total-price]");

    const countCards = document.querySelectorAll("[data-total-items]");
    countCards.forEach(card => {
        if (cadsStorageArr.length === 1) {
            card.textContent = `${cadsStorageArr.length} ITEM`;
        } else card.textContent = `${cadsStorageArr.length} ITEMS`;
    })

    let totalAmount = 0;
    totalPriceList.forEach((item) => {
        totalAmount += parseFloat(item.textContent.replace("$", ""));
    })
    innerTotalPrice.forEach((item) => {
        item.textContent = "$" + totalAmount.toFixed(2);
    })

    const innerTFinalPrice = document.querySelector("[data-final-price]");
    const choseDeliveryWrap = document.querySelector(".form-summary__delivery");
    const choseDeliveryValue = choseDeliveryWrap.querySelector(".form-summary__delivery-value");
    const deliveryOptionsList = document.querySelectorAll(".form-summary__delivery-dropdown-item");
        const deliveryOptionsArray = [...deliveryOptionsList]
        .map(item=> {
           const spans = item.querySelectorAll("span")
            return{
               name:spans[0].textContent.trim(),
                price: parseFloat(spans[1].textContent.replace(/[^\d.]/g, '')) || 0,
            };
        });

        for (let i = 0; i < deliveryOptionsArray.length; i++) {
            if (choseDeliveryValue.textContent == deliveryOptionsArray[i].name) {
                let finalPrice = parseInt(deliveryOptionsArray[i].price) + totalAmount;
                finalPrice = finalPrice.toFixed(2);
                innerTFinalPrice.textContent ="$" + finalPrice;
                localStorage.setItem('finalPrice', JSON.stringify(finalPrice));
            }
        }
}

window.addEventListener("deliveryChange", (e) => {
    calcTotal();
})



export async function loadCards() {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    })

    const cardsBody = document.querySelector(".cart-content__list-body");
    const card = document.querySelector(".cart-item");
    const cartRawData = localStorage.getItem("cart");
    let cadsStorageArr = JSON.parse(cartRawData) || [];


    for (let i = 0; i < cadsStorageArr.length; i++) {
        const cloneCard = card.cloneNode(true);

        const productId = cadsStorageArr[i].productId;

        const productData = productsMap[productId];
        if (!productData) {
            console.error(`Product with ID ${productId} not found in Firebase`);
            continue;
        }

        cloneCard.dataset.productId = cadsStorageArr[i].productId;

        const innerPhoto = cloneCard.querySelector('[data-product-photo]');
        const innerTitle = cloneCard.querySelector("[data-product-title]");
        const innerPrice = cloneCard.querySelector('[data-product-price]');
        // const amountCount = cloneCard.querySelector(".amount__number-item");

        if (productsMap[productId].photo && innerPhoto) innerPhoto.src = productsMap[productId].photo;
        if (productsMap[productId].name && innerTitle) innerTitle.textContent = productsMap[productId].name;
        if (productsMap[productId].price != null && innerPrice != null) {
            innerPrice.textContent = "$" + Number(productsMap[productId].price).toFixed(2)
        }

        const innerTotalPrice = cloneCard.querySelector('[data-product-total-price]');
        const amountProduct = cloneCard.querySelector('.amount__number-item');
        amountProduct.textContent =cadsStorageArr[i].packCount;

        // console.log("sfdg", cadsStorageArr[i].packCount);

        const amount = parseInt(amountProduct.textContent);
        const price = parseFloat(innerPrice.textContent.replace("$", ""));

        let totalPrice = amount * price;

        innerTotalPrice.textContent = "$" + totalPrice.toFixed(2);
        cardsBody.appendChild(cloneCard);
    }

    cardsBody.addEventListener("click", (e) => {
        const btnRemove = e.target.closest('.cart-item__btn-del');
        if (!btnRemove) return;

        const cardRemove = e.target.closest('.cart-item');
        const idFromDom = cardRemove.dataset.productId;
        cardRemove.remove();

        cadsStorageArr = cadsStorageArr.filter((item) => item.productId !== idFromDom);
        localStorage.setItem('cart', JSON.stringify(cadsStorageArr));
        calcTotal();
        updateCartIcon();
    })
}

export function innitAmountPrice() {

    calcTotal();

    document.querySelector('.cart-content__list-body').addEventListener('click', (e) => {
        const addAmount = e.target.closest('.amount__number-add');
        const removeAmount = e.target.closest('.amount__number-remove');

        if (addAmount) {
            const amountEl = addAmount.closest('.amount__number').querySelector('.amount__number-item');
            amountEl.textContent = Number(amountEl.textContent) + 1;
        }

        if (removeAmount) {
            const amountEl = removeAmount.closest('.amount__number').querySelector('.amount__number-item');
            let count = Number(amountEl.textContent);
            if (count > 1) amountEl.textContent = count - 1;
        }

        const totalPriceEL = e.target.closest('.cart-item').querySelector('[data-product-total-price]');
        const priceEl = e.target.closest('.cart-item').querySelector('[data-product-price]');
        const amountEl = e.target.closest('.cart-item').querySelector('.amount__number-item');

        const amount =  parseInt(amountEl.textContent);
        const price = parseFloat(priceEl.textContent.replace("$", ""));
        const totalPrice = amount * price;

        totalPriceEL.textContent = "$" + totalPrice.toFixed(2);

        let cadsStorageArr = JSON.parse(localStorage.getItem('cart')) || [];
        const productCard = e.target.closest('[data-product-id]');
        const productId = productCard.dataset.productId;

        const findProduct = cadsStorageArr.find(e => e.productId === productId);
            findProduct.packCount = amount;
            localStorage.setItem('cart', JSON.stringify(cadsStorageArr));
        calcTotal();
    })
}