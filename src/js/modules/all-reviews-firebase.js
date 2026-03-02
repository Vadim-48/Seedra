import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";

export async function allStars(dataReviewId, productId) {
    const reviewsSnapshot = await getDocs(collection(db, "reviews"));
    const reviewsMap = {};
    reviewsSnapshot.forEach((doc) => {
        reviewsMap[doc.id] = doc.data();
    })

    const reviewsListEl = document.querySelector(`[${dataReviewId}]`);
    const reviewsData = reviewsMap[productId];
    const starsCountData = [ reviewsData.oneStar, reviewsData.twoStar, reviewsData.threeStar, reviewsData.fourStar, reviewsData.fiveStar ];

    const starsListEl = [];
    for (let i = 1; i <= 5; i++) {
        starsListEl.push(reviewsListEl.querySelector(`[data-stars-${i}-number]`));
    }
    const progressListEl = [];
    for (let i = 1; i <= 5; i++) {
        progressListEl.push(reviewsListEl.querySelector(`[data-stars-${i}-progress]`));
    }
    console.log(reviewsData);

    const totalReviewsData = reviewsListEl.querySelector('[data-stars-summary-number]');

    const totalReviews = reviewsData.fiveStar + reviewsData.fourStar + reviewsData.threeStar + reviewsData.twoStar + reviewsData.oneStar;
    totalReviewsData.textContent = totalReviews;
    const summaryStar = (reviewsData.fiveStar * 5 + reviewsData.fourStar * 4 + reviewsData.threeStar * 3 + reviewsData.twoStar * 2 + reviewsData.oneStar) / totalReviews;

    for (let i = 0; i < 5; i++) {
        progressListEl[i].value = starsCountData[i];
        progressListEl[i].max = totalReviews;
        starsListEl[i].textContent = starsCountData[i];
    }

    const starsRating = reviewsListEl.querySelectorAll('[data-rating] svg use');
    const fullStar = Math.floor(summaryStar);
    const halfStar = summaryStar - fullStar;
    for (let i = 0; i < starsRating.length; i++) {
        if (fullStar > i) {
            starsRating[i].setAttribute('href', './sprite.svg#icon-star');
        } else {
            if (halfStar > 0) starsRating[i].setAttribute('href', './sprite.svg#icon-star-half');
            break;
        }
    }
}