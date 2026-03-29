export function innitAmountPack() {
    const amountPack = document.querySelector(".hero-product__selector-wrap");

    const packCountRemoveEl = amountPack.querySelector('.amount__number-remove');
    const packCountAddEl = amountPack.querySelector('.amount__number-add');
    const packCountEl = amountPack.querySelector('.amount__number-item');
    packCountRemoveEl.addEventListener('click', () => {
        let count = parseInt(packCountEl.textContent, 10);
        if (count > 1) {count -= 1;}
        packCountEl.textContent = count;
    })
    packCountAddEl.addEventListener('click', () => {
        let count = parseInt(packCountEl.textContent, 10);
        count += 1;
        packCountEl.textContent = count;
    })


    const packSelectListEl = amountPack.querySelectorAll('.selector__input');
    const packChoseEl = amountPack.querySelector('.selector__chose-number');
    packSelectListEl.forEach((el, index) =>{
        el.addEventListener('change', () => {
            packChoseEl.textContent = el.value + " pack";
        })
    })
}