import { app } from '@/firebase/firebase.js';
import { burger } from "@/js/modules/burger.js";
import { burgerAccordion } from "@/js/modules/burger-accordion.js";

console.log('Firebase ready', app);

document.addEventListener("DOMContentLoaded", async() => {

    burger();

    burgerAccordion();
});