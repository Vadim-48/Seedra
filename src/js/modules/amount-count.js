export  function innitAmount() {
    const packCountRemoveEl = document.querySelector('.amount__number-remove');
    const packCountAddEl = document.querySelector('.amount__number-add');
    const packCountEl = document.querySelector('.amount__number-item');
    packCountRemoveEl.addEventListener('click', () => {
        let count = parseInt(packCountEl.textContent, 10);
        if (count > 0) {count -= 1;}
        packCountEl.textContent = count;
    })
    packCountAddEl.addEventListener('click', () => {
        let count = parseInt(packCountEl.textContent, 10);
        count += 1;
        packCountEl.textContent = count;
    })
}