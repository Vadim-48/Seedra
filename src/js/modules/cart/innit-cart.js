import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

import {updateCartIcon} from "@/js/modules/update-header-icons.js";
import {formatMoney} from "@/js/modules/format-money.js";


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

    let productsPrice = 0;
    totalPriceList.forEach((item) => {
        productsPrice += parseFloat(item.textContent.replace(/[^\d.,]/g, '').replace(',', '.'));
    })
    innerTotalPrice.forEach((item) => {
        item.textContent = formatMoney(productsPrice);
    })

    const innerTFinalPrice = document.querySelector("[data-final-price]");
    const choseDeliveryWrap = document.querySelector(".form-summary__delivery");
    const choseDeliveryValue = choseDeliveryWrap.querySelector(".form-summary__delivery-value");
    const deliveryOptionsList = choseDeliveryWrap.querySelectorAll(".form-summary__delivery-dropdown-item");
    const deliveryOptionsArray = [...deliveryOptionsList]
        .map(item => {
            const spans = item.querySelectorAll("span")
            return {
                name: spans[0].textContent.trim(),
                price: parseFloat(spans[1].textContent.replace(/[^\d.,]/g, '').replace(',', '.')) || 0,
            };
        });

    let calcAmount = 0;
    for (let i = 0; i < cadsStorageArr.length; i++) {
        calcAmount += cadsStorageArr[i].packCount;
    }
    let deliveryModifier = Math.trunc(calcAmount / 10);
    if (deliveryModifier > 0) {
        deliveryModifier = (1 + deliveryModifier * 0.1).toFixed(2);
    } else {
        deliveryModifier = 1
    }

    let finalPrice = 0;
    if (productsPrice !== 0) {
        for (let i = 0; i < deliveryOptionsArray.length; i++) {
            const deliveryPrice = deliveryOptionsList[i].querySelector("[data-delivery-base-price]");
            let newDeliveryPrice = parseFloat(deliveryPrice.dataset.deliveryBasePrice) * deliveryModifier;
            deliveryPrice.textContent = formatMoney(newDeliveryPrice);
            deliveryOptionsArray[i].price = newDeliveryPrice;
            if (productsPrice == 0) {
            }

            if (choseDeliveryValue.textContent == deliveryOptionsArray[i].name) {
                finalPrice = parseFloat(deliveryOptionsArray[i].price) + productsPrice;
            }
        }
    }
    innerTFinalPrice.textContent = formatMoney(finalPrice);
    localStorage.setItem('finalPrice', JSON.stringify(finalPrice));
}

window.addEventListener("deliveryChange", (e) => {
    calcTotal();
})


export async function loadCards() {

    const deliveryDropdown = document.querySelector(".form-summary__delivery-dropdown");
    const deliveryDropdownPriceList = deliveryDropdown.querySelectorAll(".form-summary__delivery-dropdown-item span:last-child");
    deliveryDropdownPriceList.forEach((item) => {
        item.dataset.deliveryBasePrice = item.textContent.replace(/[^\d.,]/g, '');
    })


    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    })

    const cardsBody = document.querySelector(".cart-content__list-body");
    const templateWrap =document.getElementById("cart-item-template");
    // const card = document.querySelector(".cart-item");
    const cartRawData = localStorage.getItem("cart");
    let cadsStorageArr = JSON.parse(cartRawData) || [];

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < cadsStorageArr.length; i++) {
        const templateFragment = templateWrap.content.cloneNode(true);
        const cloneCard = templateFragment.querySelector('.cart-item');

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
            const price = parseFloat(productsMap[productId].price).toFixed(2);
            innerPrice.textContent = formatMoney(price);
            // innerPrice.textContent ="$" + price;
            // innerPrice.textContent = "$" + Number(productsMap[productId].price).toFixed(2)
        }

        const innerTotalPrice = cloneCard.querySelector('[data-product-total-price]');
        const amountProduct = cloneCard.querySelector('.amount__number-item');
        amountProduct.textContent = cadsStorageArr[i].packCount;

        // console.log("sfdg", cadsStorageArr[i].packCount);

        const amount = parseInt(amountProduct.textContent);
        const price = parseFloat(innerPrice.textContent.replace(/[^\d.,]/g, '').replace(',', '.'));

        let totalPrice = amount * price;
        totalPrice = totalPrice.toFixed(2);
        innerTotalPrice.textContent = formatMoney(totalPrice);

        fragment.appendChild(cloneCard);
    }
    cardsBody.appendChild(fragment);
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

        const amount = parseInt(amountEl.textContent);
        const price = parseFloat(priceEl.textContent.replace(/[^\d.,]/g, '').replace(',', '.'));
        const totalPrice = amount * price;

        totalPriceEL.textContent = formatMoney(totalPrice);

        let cadsStorageArr = JSON.parse(localStorage.getItem('cart')) || [];
        const productCard = e.target.closest('[data-product-id]');
        const productId = productCard.dataset.productId;

        const findProduct = cadsStorageArr.find(e => e.productId === productId);
        findProduct.packCount = amount;
        localStorage.setItem('cart', JSON.stringify(cadsStorageArr));
        calcTotal();
    })
}