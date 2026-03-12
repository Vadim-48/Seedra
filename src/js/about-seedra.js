import {burger} from "@/js/modules/burger.js";
import {burgerAccordion} from "@/js/modules/burger-accordion.js";
import {initOurTeamSwiper} from "@/js/modules/about-seedra/our-team-swiper.js";

document.addEventListener("DOMContentLoaded", async () => {

    burger();
    burgerAccordion();

    initOurTeamSwiper();

});