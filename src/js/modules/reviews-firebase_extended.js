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
        const innerName = reviewsList.querySelector('[data-review-name]');
        const innerPhoto = reviewsList.querySelector('[data-review-photo]');
        const innerText = reviewsList.querySelector('[data-review-text]');

        if (reviewsItem.date && innerDate) innerDate.textContent = reviewsItem.date;
        if (reviewsItem.name && innerName) innerName.textContent = reviewsItem.name;
        if (reviewsItem.photo && innerPhoto) innerPhoto.src = reviewsItem.photo;
        if (reviewsItem.text && innerText) innerText.textContent = reviewsItem.text;
    }

    loadReview();
}