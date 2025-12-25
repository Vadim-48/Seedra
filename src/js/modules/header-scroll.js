export function headerScroll() {
    window.addEventListener('scroll', () =>{
        if (header) {
            header.classList.toggle('scrolled', window.scrollY >0);
        }
    });
}