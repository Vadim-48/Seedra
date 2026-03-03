import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

export async function totalStars(dataReviewId, productId) {
    const reviewsStarsSnapshot = await getDocs(collection(db, "reviews"));
    const reviewsStarsMap = {};
    reviewsStarsSnapshot.forEach((doc) => {
        reviewsStarsMap[doc.id] = doc.data();
    })

    const reviewsListEl = document.querySelector(`[${dataReviewId}]`);
    const starsData = reviewsStarsMap[productId];
    const starsArrayData = [starsData.oneStar, starsData.twoStar, starsData.threeStar, starsData.fourStar, starsData.fiveStar];

    const starsListEl = [];
    const progressListEl = [];
    for (let i = 1; i <= 5; i++) {
        starsListEl.push(reviewsListEl.querySelector(`[data-stars-${i}-number]`));
        progressListEl.push(reviewsListEl.querySelector(`[data-stars-${i}-progress]`));
    }


    const totalStarsData = reviewsListEl.querySelector('[data-stars-summary-number]');

    const sumStars = starsData.fiveStar + starsData.fourStar + starsData.threeStar + starsData.twoStar + starsData.oneStar;
    // totalStarsData.textContent = sumStars;
    const mediumStar = Math.round((starsData.fiveStar * 5 + starsData.fourStar * 4 + starsData.threeStar * 3 + starsData.twoStar * 2 + starsData.oneStar) / sumStars * 10) / 10;
    totalStarsData.textContent = mediumStar;

    for (let i = 0; i < 5; i++) {
        progressListEl[i].value = starsArrayData[i];
        progressListEl[i].max = sumStars;
        starsListEl[i].textContent = starsArrayData[i];
    }

    const starsRating = reviewsListEl.querySelectorAll('[data-rating] svg use');
    const fullStar = Math.floor(mediumStar);
    const halfStar = mediumStar - fullStar;
    for (let i = 0; i < starsRating.length; i++) {
        if (fullStar > i) {
            starsRating[i].setAttribute('href', './sprite.svg#icon-star');
        } else {
            if (halfStar > 0) starsRating[i].setAttribute('href', './sprite.svg#icon-star-half');
            break;
        }
    }
}

export async function allReviewsImg(dataReviewId, productId) {
    const reviewsSnapshot = await getDocs(collection(db, "reviews"));
    const reviewsMap = {};
    reviewsSnapshot.forEach((doc) => {
        reviewsMap[doc.id] = doc.data();
    })

    const allImgListEl = document.querySelector(`[${dataReviewId}]`);
    const reviewsListData = reviewsMap[productId];
    console.log(reviewsListData);

    const reviewsImgListEl = allImgListEl.querySelectorAll('[data-reviews-img] img');
    reviewsImgListEl.forEach((el, index) => {
        if (el && reviewsListData.img[index]) {
            el.src = reviewsListData.img[index];
        }
    })

    const reviewsNumberListEl = document.querySelectorAll('[data-reviews-number]');
    reviewsNumberListEl.forEach((el, index) => {
        if (el && reviewsListData.number) {
            el.textContent =  reviewsListData.number + " reviews";
        }
    })
}