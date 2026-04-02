export const initPaymentFormValidate = () => {
    const form = document.getElementById('payment-form');
    if (!form) return;

    const inputList = form.querySelectorAll('[data-payment-card], [data-payment-date], [data-payment-cvv]');

    inputList.forEach((item) => {
        const textError = item.closest('label').querySelector('[data-text-error]');

        item.addEventListener('input', (e) => {
            if (textError) textError.textContent = '';
            item.classList.remove('error');

            let value = e.target.value;

            if (item.hasAttribute('data-payment-card')) {
                value = value.replace(/\D/g, '');
                value = value.substring(0, 16);
                e.target.value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
            }

            if (item.hasAttribute('data-payment-date')) {
                value = value.replace(/[^\d/]/g, '');
                value = value.substring(0, 5);

                if (value.length === 2 && !value.includes('/') && e.inputType !== 'deleteContentBackward') {
                    value += '/';
                }
                e.target.value = value;
            }

            if (item.hasAttribute('data-payment-cvv')) {
                value = value.replace(/\D/g, '');
                e.target.value = value.substring(0, 3);
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let errorFound = false;

        inputList.forEach((item) => {
            const textError = item.closest('label').querySelector('[data-text-error]');
            const value = item.value.trim();

            if (textError) textError.textContent = '';
            item.classList.remove('error');

            if (item.hasAttribute('data-payment-card')) {
                const rawCardValue = value.replace(/\s+/g, '');
                const cardRegex = /^\d{16}$/;

                if (!cardRegex.test(rawCardValue)) {
                    if (textError) textError.textContent = 'Try again';
                    item.classList.add('error');
                    errorFound = true;
                }
            }

            if (item.hasAttribute('data-payment-date')) {
                const dateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

                if (!dateRegex.test(value)) {
                    if (textError) textError.textContent = 'Try again';
                    item.classList.add('error');
                    errorFound = true;
                }
            }

            if (item.hasAttribute('data-payment-cvv')) {
                const cvvRegex = /^\d{3}$/;
                if (!cvvRegex.test(value)) {
                    if (textError) textError.textContent = 'Try again';
                    item.classList.add('error');
                    errorFound = true;
                }
            }
        });

        if (!errorFound) {
            window.location.href = './payment.html';
        }
    });
};
