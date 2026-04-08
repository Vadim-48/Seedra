export function innitAmountPack() {
    const amountPack = document.querySelector(".hero-product__selector-wrap");
    const packCountRemoveEl = amountPack.querySelector('.amount__number-remove');
    const packCountAddEl = amountPack.querySelector('.amount__number-add');
    const packCountEl = amountPack.querySelector('.amount__number-item');
    const packSizeEl = amountPack.querySelector('.selector__chose-number');

    const selectorWrap =document.querySelector('.selector__option-list');
    const packSelectListEl = amountPack.querySelectorAll('.selector__input');

    const inputChecked =selectorWrap.querySelector('.selector__input:checked');
    let count = 1;
    changePack();
    function changePack() {
        packCountEl.textContent = count;
        packSizeEl.textContent = count + " pack";
        packSelectListEl.forEach(el =>{
            el.checked = false;
        })
        if ((count >= 1) && (count < 6)) {
            packSelectListEl.forEach(el =>{
                if (el.value == count) {el.checked = true;}
            })
        }
    }

    packCountRemoveEl.addEventListener('click', () => {
        count = parseInt(packCountEl.textContent, 10);
        if (count > 1) {count -= 1;}
        changePack()
    })
    packCountAddEl.addEventListener('click', (e) => {
        count = parseInt(packCountEl.textContent, 10);
        if (count < 100) {count += 1;}
        // count += 1;
        changePack()
    })

    selectorWrap.addEventListener('change',(e) => {
        const clickEl = e.target.closest('.selector__option');
        if (!clickEl) {return}
        packSizeEl.textContent = e.target.value + " pack";
        packCountEl.textContent = e.target.value;
    })
}