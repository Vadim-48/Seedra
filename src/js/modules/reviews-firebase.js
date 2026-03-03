import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.js";

export async function loadReviewFirebase(dataReviewId, productId) {
    const reviewsSnapshot = await getDocs(collection(db, "reviews"));
    const reviewsMap = {};
    reviewsSnapshot.forEach((doc) => {
        reviewsMap[doc.id] = doc.data();
    })

    const loadReview = () => {
        const reviewsList = document.querySelector(`[data-review-id="${dataReviewId}"]`);
        const reviewsItem = reviewsMap[productId];
        // console.log("reviewsMap: ", reviewsItem);

        const innerDate = reviewsList.querySelector('[data-review-date]');
        const innerDateExtended = reviewsList.querySelector('[data-review-date-extended]');
        const innerName = reviewsList.querySelector('[data-review-name]');
        const innerPhoto = reviewsList.querySelector('[data-review-photo]');
        const innerGallery = reviewsList.querySelector('[data-review-gallery]');
        const innerImgList = reviewsList.querySelectorAll('[data-review-img]');
        const innerText = reviewsList.querySelector('[data-review-text]');
        const innerPackSize = reviewsList.querySelector('[data-review-pack-size]');
        const innerVerified = reviewsList.querySelector('[data-review-verified]');

        if (reviewsItem.date && innerDate) innerDate.textContent = reviewsItem.date;
        if (reviewsItem.dateExtended && innerDateExtended) innerDateExtended.textContent = reviewsItem.dateExtended;
        if (reviewsItem.name && innerName) innerName.textContent = reviewsItem.name;
        if (reviewsItem.photo && innerPhoto) innerPhoto.src = reviewsItem.photo;
        if (reviewsItem.text && innerText) innerText.textContent = reviewsItem.text;
        if (reviewsItem.packSize && innerPackSize) innerPackSize.textContent = reviewsItem.packSize + " PACK";
        if (reviewsItem.verified && innerVerified) innerVerified.style.display = "flex";


        if (reviewsItem.reviewImg && innerImgList && innerGallery) {
            innerGallery.style.display = 'flex';
            innerImgList.forEach((img, index) => {
                if (reviewsItem.reviewImg[index] && img) {
                img.src = reviewsItem.reviewImg[index];
                }
            });
        }

        const stars = reviewsList.querySelectorAll('[data-rating] svg use');
        const fullStar = Math.floor(reviewsItem.star);
        const halfStar = reviewsItem.star - fullStar;
        for (let i = 0; i < stars.length; i++) {
            if (fullStar > i) {
                stars[i].setAttribute('href', './sprite.svg#icon-star');
            } else {
                if (halfStar > 0) stars[i].setAttribute('href', './sprite.svg#icon-star-half');
                break;
            }
        }
    }

    loadReview();
}