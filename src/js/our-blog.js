import {app} from '@/firebase/firebase.js';
import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {
    updateCartIcon,
    updateFavoriteIcon
} from "@/js/modules/update-header-icons.js";
import {initSort} from "@/js/modules/innit-sort.js";

import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();

    updateCartIcon();
    updateFavoriteIcon();
    initSort();
});


Toastify ( {
    text : "Это всплывающее сообщение" ,
    duration : 3000 ,
    destination : "https://github.com/apvarun/toastify-js" ,
    newWindow : true ,
    close : true ,
    gravity : "top" ,  // `top` или `bottom`
    position : "left" ,  // `left`, `center` или `right`
    stopOnFocus : true ,  // Предотвращает закрытие всплывающего сообщения при наведении курсора
    style : {
        background : "linear-gradient(to right, #00b09b, #96c93d)" ,
    } ,
    onClick : function ( ) { }  // Коллбэк после клика
} ) . showToast ( ) ;

