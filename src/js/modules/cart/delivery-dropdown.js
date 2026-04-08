export const innitDeliveryDropdown = () => {
    const btnWrap = document.querySelector('.form-summary__delivery');
    const btnDelivery = btnWrap.querySelector('.form-summary__delivery-select');
    const btnValue = btnWrap.querySelector('.form-summary__delivery-value');
    const dropdownItem = btnWrap.querySelectorAll('.form-summary__delivery-dropdown-item');

    btnDelivery.addEventListener('click', (e) => {
        btnWrap.classList.toggle('open');
    })

    dropdownItem.forEach(item => {
        item.addEventListener('click', () => {
            // btnValue.textContent = item.textContent;
            btnValue.textContent = item.querySelector('span').textContent;
            btnWrap.classList.remove('open');

            const event = new CustomEvent('deliveryChange', {
                detail: {method: item.textContent},
            });
            window.dispatchEvent(event);
        })
    })

    window.addEventListener('click', (e) => {
        if (!btnWrap.contains(e.target)) {
            btnWrap.classList.remove('open');
        }
    })
}
