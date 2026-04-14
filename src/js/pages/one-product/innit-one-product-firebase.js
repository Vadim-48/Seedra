import {collection, getDocs} from "firebase/firestore";
// import {collection, getDocs, getDoc, doc} from "firebase/firestore";
import {
    where,
    getAggregateFromServer,
    average,
    query, count,
} from "firebase/firestore";
import {db} from "@/firebase/firebase.js";
import {formatMoney} from "@/js/modules/format-money.js";


export async function loadOneProductFirebase() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("_productId");
    if (!productId) {
        window.location.href = "../../../../index.html";
        return;
    }

    const productsSnapshot = await getDocs(collection(db, "products"));
    const productsMap = {};
    productsSnapshot.forEach((doc) => {
        productsMap[doc.id] = doc.data();
    })
    const product = productsMap[productId];

    const cardList = document.querySelector(`[data-product-id]`);
    cardList.dataset.productId = productId;

    const breadcrumbWrap = document.querySelector('[data-breadcrumb-wrap]');
    const innerBreadcrumbCategory = breadcrumbWrap.querySelector('[data-breadcrumb-category]');
    const innerBreadcrumbType = breadcrumbWrap.querySelector('[data-breadcrumb-type]');
    const innerBreadcrumbName = breadcrumbWrap.querySelector('[data-breadcrumb-name]');

    if (product.type && innerBreadcrumbType) {
        innerBreadcrumbType.textContent = product.type.replace('-', ' ');
        innerBreadcrumbType.dataset.breadcrumbType = product.type;
    }
    if (product.category && innerBreadcrumbCategory) {
        innerBreadcrumbCategory.textContent = product.category;
        innerBreadcrumbCategory.dataset.breadcrumbCategory = product.category;
    }
    if (product.shortName && innerBreadcrumbName) innerBreadcrumbName.textContent = product.shortName;


    const innerTitle = cardList.querySelector('[data-product-name]');
    const innerPrice = cardList.querySelector('[data-product-price]');
    const innerOldPrice = cardList.querySelector('[data-product-old-price]');
    const innerFirePrice = cardList.querySelector('[data-product-fire-price]');
    const innerIsAvalible = cardList.querySelector('[data-product-status]');
    const innerCategory = cardList.querySelector('[data-product-category] span');
    const innerCategoryIcon = cardList.querySelector('[data-product-category] use');

    if (product.name && innerTitle) innerTitle.textContent = product.name;
    if (product.price != null && innerPrice != null) innerPrice.textContent = formatMoney(product.price);
    if (product.firePrice && innerFirePrice) innerFirePrice.style.display = "block";
    if (product.oldPrice != null && innerOldPrice != null) innerOldPrice.textContent = formatMoney(product.oldPrice);
    if (product.available && innerIsAvalible) innerIsAvalible.classList.add('is-available');
    if (product.category && innerCategory) {
        innerCategory.textContent = product.category;
        let categoryHref = innerCategoryIcon.href.baseVal;
        categoryHref = categoryHref.replace('all', `${product.category}`);
        innerCategoryIcon.href.baseVal = categoryHref;
    }

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

    const reviewCardWrap = document.querySelector('[data-reviews-wrap]');
    const templateWrap = document.querySelector("#reviews-template");

    // const reviewCardTemplate = document.querySelector('.user-reviews__card-template-wrap .user-reviews__card-review-wrap');
    const subCollectionProducts = collection(db, "products", productId, "reviews");
    const subSnapshot = await getDocs(subCollectionProducts);

    let countReviews = 0;
    subSnapshot.forEach((doc) => {
        const data = doc.data();
        countReviews++;
        if (countReviews > 5) {
            return
        }

        const templateFragment = templateWrap.content.cloneNode(true);

        const reviewsGalleryTemplate = templateFragment.querySelector('[data-template-gallery]');
        const templateFragmentPhoto = reviewsGalleryTemplate.content.querySelector('.card-review__link');

        const cloneReviewCard = templateFragment.querySelector(".card-review");
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
        if (innerReviewPacks && data.packSize) {
            if (data.packSize == 1) {
                innerReviewPacks.textContent = data.packSize + " pack";
            }
            innerReviewPacks.textContent = data.packSize + " packs";

        }
        if (innerReviewVerified && data.verified) innerReviewVerified.style.display = "flex";

        if (data.reviewImg) {
            const reviewsImgWrap = cloneReviewCard.querySelector('[data-review-gallery]');
            reviewsImgWrap.style.display = "flex";

            // const reviewsPictureTemplate = cloneReviewCard.querySelector('[data-template-review]');
            // const reviewsPicture = templateFragmentPhoto.cloneNode(true);
            // const reviewsPicture = cloneReviewCard.querySelector('.card-review__review-img');

            data.reviewImg.forEach(img => {
                const reviewsPictureTemplate = templateFragmentPhoto.cloneNode(true);
                const reviewsImgTemplate = reviewsPictureTemplate.querySelector('img');
                const reviewsImgLinkTemplate = reviewsPictureTemplate.querySelector('a');

                reviewsPictureTemplate.dataset.fancybox =`${product.shortName.toLowerCase().replaceAll(/\s+/g, '-')}-review`;
                reviewsPictureTemplate.href = img;
                reviewsPictureTemplate.dataset.caption =product.shortName + " - photo by " + data.name  ;
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


    const innerTotalStar = document.querySelector('[data-stars-summary-number]');
    const snapshotReviews = await getAggregateFromServer(subCollectionProducts, {
        averageStars: average('star'),
        totalReviews: count(),
    });

    innerTotalStar.textContent = (snapshotReviews.data().averageStars).toFixed(1);
    const innerReviewsHumberList = document.querySelectorAll('[data-reviews-number]');
    const productReviewsLength = snapshotReviews.data().totalReviews;
    innerReviewsHumberList.forEach(item => {
        if (item && productReviewsLength) {
            if (productReviewsLength === 1) {
                item.textContent = productReviewsLength + " review";
            } else {
                item.textContent = productReviewsLength + " reviews";
            }
        }
    });

    const allStarsWrap = document.querySelector('[data-rating-all]');
    const stars = allStarsWrap.querySelectorAll('[data-rating] use');
    const fullStar = Math.floor(snapshotReviews.data().averageStars);
    const halfStar = snapshotReviews.data().averageStars - fullStar;
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
    // let j = 0;
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
    const reviewsGalleryWrap = document.querySelector('[data-gallery-wrap]');
    const templateGalleryWrap = reviewsGalleryWrap.querySelector('[data-gallery-template]');
    const fragmentGalleryPhotoWrap = templateGalleryWrap.content.querySelector('.reviews-gallery__photo-link');
    // const reviewsGalleryPicture = reviewsGalleryWrap.querySelector('[data-reviews-img]');

    let countReviewsGalleryPicture = 1;
    reviewsImgListData.forEach(img => {
        img.forEach(item => {
            if (countReviewsGalleryPicture > 4) {
                return
            }
            const cloneGalleryPhotoWrap = fragmentGalleryPhotoWrap.cloneNode(true);
            const cloneGalleryImg =cloneGalleryPhotoWrap.querySelector('[data-product-photo]');
            cloneGalleryPhotoWrap.dataset.fancybox = "reviews-gallery";
            cloneGalleryPhotoWrap.href = item;
            cloneGalleryPhotoWrap.dataset.caption ="Customer photo — " + product.shortName;

            cloneGalleryImg.src = item;
            reviewsGalleryWrap.appendChild(cloneGalleryPhotoWrap);
            ++countReviewsGalleryPicture;
        })
    })
}