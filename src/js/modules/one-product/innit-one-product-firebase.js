import {collection, getDocs} from "firebase/firestore";
import {
    where,
    getAggregateFromServer,
    average,
    query,
} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";


export async function loadOneProductFirebase(dataCard, productId) {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    })
    const product = productsMap[productId];

    const cardList = document.querySelector(`[data-product-id]`);
    cardList.dataset.productFirebase = productId;

    const innerTitle = cardList.querySelector('[data-product-name]');
    const innerPrice = cardList.querySelector('[data-product-price]');
    const innerOldPrice = cardList.querySelector('[data-product-old-price]');
    const innerFirePrice = cardList.querySelector('[data-product-fire-price]');

    if (product.name && innerTitle) innerTitle.textContent = product.name;
    if (product.price != null && innerPrice != null) innerPrice.textContent = "$" + product.price.toFixed(2);
    if (product.firePrice && innerFirePrice) innerFirePrice.style.display = "block";
    if (product.oldPrice != null && innerOldPrice != null) innerOldPrice.textContent = "$" + product.oldPrice.toFixed(2);

    const innerPhotoList = cardList.querySelectorAll('[data-product-photo]');
    const innerThumbsList = cardList.querySelectorAll('[data-product-thumb]');

    for (let i = 0; i < innerPhotoList.length; i++) {
        innerPhotoList[i].src = product.thumbs[i];
        innerThumbsList[i].src = product.thumbs[i];
    }

    const innerVideoWrapList = cardList.querySelectorAll('[data-product-video-wrap]');

    innerVideoWrapList.forEach(video => {
        video.src = product.video.img;
    })

    const innerDataVideoIdList = cardList.querySelectorAll('[data-video-id]');
    innerDataVideoIdList.forEach(el => {
        el.dataset.videoId = product.video.id;
    })

    const reviewCardWrap = document.querySelector('.user-reviews__swiper-wrapper');
    const reviewCardTemplate = document.querySelector('.user-reviews__card-template-wrap .user-reviews__card-review-wrap');
    const subCollectionProducts = collection(db, "products", productId, "reviews");
    const subSnapshot = await getDocs(subCollectionProducts);

    let countReviews = 0;
    subSnapshot.forEach((doc) => {
        const data = doc.data();
        countReviews++;
        if (countReviews > 5) {
            return
        }
        const cloneReviewCard = reviewCardTemplate.cloneNode(true);
        cloneReviewCard.classList.add('swiper-slide');

        const innerReviewTitle = cloneReviewCard.querySelector('[data-review-name]');
        const innerReviewUserPhoto = cloneReviewCard.querySelector('[data-review-photo]');
        const innerReviewDate = cloneReviewCard.querySelector('[data-review-date-extended]');
        const innerReviewText = cloneReviewCard.querySelector('[data-review-text]');
        const innerReviewPacks = cloneReviewCard.querySelector('[data-review-pack-size]');
        const innerReviewVerified = cloneReviewCard.querySelector('[data-review-verified]');

        if (innerReviewTitle && data.name) innerReviewTitle.textContent = data.name;
        if (innerReviewUserPhoto && data.photo) innerReviewUserPhoto.src = data.photo;
        if (innerReviewDate && data.dateExtended) innerReviewDate.textContent = data.dateExtended;
        if (innerReviewText && data.text) innerReviewText.textContent = data.text;
        if (innerReviewPacks && data.packSize) innerReviewPacks.textContent = data.packSize;
        if (innerReviewVerified && data.verified) innerReviewVerified.style.display = "flex";

        if (data.reviewImg) {
            const reviewsImgWrap = cloneReviewCard.querySelector('[data-review-gallery]');
            reviewsImgWrap.style.display = "flex";

            const reviewsPicture = cloneReviewCard.querySelector('.card-review__review-img');


            data.reviewImg.forEach(img => {
                const reviewsPictureTemplate = reviewsPicture.cloneNode(true);
                const reviewsImgTemplate = reviewsPictureTemplate.querySelector('img');
                reviewsImgTemplate.src = img;
                reviewsImgWrap.appendChild(reviewsPictureTemplate);
            })
        }


        const stars = cloneReviewCard.querySelectorAll('[data-rating] svg use');
        const fullStar = Math.floor(data.star);
        const halfStar = data.star - fullStar;
        for (let i = 0; i < stars.length; i++) {
            if (fullStar > i) {
                stars[i].setAttribute('href', './sprite.svg#icon-star');
            } else {
                if (halfStar > 0) stars[i].setAttribute('href', './sprite.svg#icon-star-half');
                break;
            }
        }

        reviewCardWrap.appendChild(cloneReviewCard);
    })

    const innerReviewsHumberList = document.querySelectorAll('[data-reviews-number]');
    const productReviewsLength = subSnapshot.size;
    innerReviewsHumberList.forEach(item => {
        if (item && productReviewsLength) {
            if (productReviewsLength === 1) {
                item.textContent = productReviewsLength + " review";
            } else {
                item.textContent = productReviewsLength + " reviews";
            }
        }
    });


    const innerTotalStar = document.querySelector('[data-stars-summary-number]');
    const snapshot = await getAggregateFromServer(subCollectionProducts, {
        averageStars: average('star'),
    });
    innerTotalStar.textContent = snapshot.data().averageStars;

    const allStarsWrap = document.querySelector('[data-rating-all]');
    const stars = allStarsWrap.querySelectorAll('[data-rating] use');
    const fullStar = Math.floor(snapshot.data().averageStars);
    const halfStar = snapshot.data().averageStars - fullStar;
    for (let i = 0; i < stars.length; i++) {
        if (fullStar > i) {
            stars[i].setAttribute('href', './sprite.svg#icon-star');
        } else {
            if (halfStar > 0) stars[i].setAttribute('href', './sprite.svg#icon-star-half');
            break;
        }
    }

    const oneStar = query(subCollectionProducts, where("star", ">", 0.5), where("star", "<", 1.4));
    const twoStar = query(subCollectionProducts, where("star", ">", 1.5), where("star", "<", 2.4));
    const threeStar = query(subCollectionProducts, where("star", ">", 2.5), where("star", "<", 3.4));
    const fourStar = query(subCollectionProducts, where("star", ">", 3.5), where("star", "<", 4.4));
    const fiveStar = query(subCollectionProducts, where("star", ">", 4.5));

    const queriesStars = [oneStar, twoStar, threeStar, fourStar, fiveStar];
    const snapshotStars = await Promise.all(queriesStars.map(q => getDocs(q)));
    const countStars = snapshotStars.map(snap => snap.size);

    const starsListEl = [];
    const progressListEl = [];
    for (let i = 1; i <= 5; i++) {
        starsListEl.push(allStarsWrap.querySelector(`[data-stars-${i}-number]`));
        progressListEl.push(allStarsWrap.querySelector(`[data-stars-${i}-progress]`));
    }
    let j = 0;
    for (let i = 0; i < 5; i++) {
        progressListEl[i].value = countStars[i];
        progressListEl[i].max = productReviewsLength;
        starsListEl[i].textContent = countStars[i];
    }

    const reviewsImgData = query(subCollectionProducts, where("reviewImg", "!=", null));
    const snapshotReviewsImg = await getDocs(reviewsImgData);
    const reviewsImgListData = [];
    snapshotReviewsImg.forEach((doc) => {
        reviewsImgListData.push(doc.data().reviewImg);
    });
    const reviewsGalleryWrap = document.querySelector('[data-photos-video]');
    const reviewsGalleryPicture = reviewsGalleryWrap.querySelector('[data-reviews-img]');

    let countReviewsGalleryPicture = 1;
    reviewsImgListData.forEach(img => {
        img.forEach(item => {
            if (countReviewsGalleryPicture > 4) {return}
            const reviewsElTemplate = reviewsGalleryPicture.cloneNode(true);
            const reviewsGalleryImg = reviewsElTemplate.querySelector('img');
            reviewsGalleryImg.src = item;
            reviewsGalleryWrap.appendChild(reviewsElTemplate);
            ++countReviewsGalleryPicture;
        })
    })

    console.log(reviewsImgListData);
}