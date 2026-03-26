import IMask from 'imask';

export const initFormValidate = () => {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    const inputList = form.querySelectorAll('input');
    const phoneInput = form.querySelector('input[type="tel"]');

    const maskOptions = {
        mask: '+1 (000) 000-00-00',
        lazy: true,
    };

    IMask(phoneInput, maskOptions);

    inputList.forEach((item) => {
        const textError = item.closest('label').querySelector('[data-text-error]');

        item.addEventListener('input', () => {
            if (item.value.trim()) {
                if (item.type === 'tel') {
                    const digits  = item.value.replace(/\D/g, '');
                    if (digits.length === 11) {
                        textError.textContent = '';
                        item.classList.remove('error');
                    }
                } else {
                    textError.textContent = '';
                    item.classList.remove('error');
                }
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let errorFound = false;

        inputList.forEach((item) => {
            const textError = item.closest('label').querySelector('[data-text-error]');

            if (item.type === 'tel') {
                const digits = item.value.replace(/\D/g, '');
                if (digits.length !== 11) {
                    textError.textContent = 'Try again';
                    item.classList.add('error');
                    errorFound = true;
                    return;
                }
            }

            if (!item.value.trim()) {
                textError.textContent = 'Try again';
                item.classList.add('error');
                errorFound = true;
            } else if (item.type !== 'tel') {
                textError.textContent = '';
                item.classList.remove('error');
            }
        });

        if (!errorFound) {
            form.submit();
            // window.location.href = './payment.html';
        }
    });
};
