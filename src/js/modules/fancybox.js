import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export function innitFancybox() {
    Fancybox.bind("[data-fancybox]", {
        Hash: false,
        Thumbs: {
            autoStart: false,
        },
    });
}