export function updateCartIcon() {
    const cartRawData = localStorage.getItem("cart");
    const cartIcon = document.querySelector(".header__card-btn use");
    if (!cartIcon) return;
    let cadsStorageArr = JSON.parse(cartRawData) || [];
    const currentHref = cartIcon.getAttribute('href');
    const baseSpritePath = currentHref.split('#')[0];
    let newPath;
    if (cadsStorageArr.length > 0)  {
        newPath = `${baseSpritePath}#icon-cart-full`;
    } else {
        newPath = `${baseSpritePath}#icon-cart`;
    }

    cartIcon.setAttribute('href', newPath);
}

export function updateFavoriteIcon() {
    const favoriteRawData = localStorage.getItem("favorite");
    const favoriteIcon = document.querySelector(".header__favorite-btn use");
    if (!favoriteIcon) return;

    let favoriteStorageArr = JSON.parse(favoriteRawData) || [];
    const currentHref = favoriteIcon.getAttribute('href');
    const baseSpritePath = currentHref.split('#')[0];
    let newPath;
    if (favoriteStorageArr.length > 0)  {

        newPath = `${baseSpritePath}#icon-green-favorite-full`;

    } else {
        newPath = `${baseSpritePath}#icon-favorite`;
    }
    favoriteIcon.setAttribute('href', newPath);
}

export function notifyUpdate() {
    window.dispatchEvent(new Event("headerIconsUpdate"));
}