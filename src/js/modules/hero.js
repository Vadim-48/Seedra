import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.js";

export async function loadHeroProduct() {
    const docRef = doc(db, "products", "product-1");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;

    const product = docSnap.data();

    // title
    document.getElementById("hero-title").innerHTML = product.title;

    // prices
    document.getElementById("hero-price").textContent =
        `$${product.price.toFixed(2)}`;

    const oldPriceEl = document.getElementById("hero-old-price");

    if (product.oldPrice) {
        oldPriceEl.textContent = `$${product.oldPrice.toFixed(2)}`;
    } else {
        oldPriceEl.style.display = "none";
    }

    // image
    document.getElementById("hero-image").src = product.image;
}
