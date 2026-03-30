import lpn from 'google-libphonenumber';

export const initFormValidate = () => {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    const inputList = form.querySelectorAll('input');
    const phoneUtil = lpn.PhoneNumberUtil.getInstance();
    const PNF = lpn.PhoneNumberFormat;

    function validateFullNumber(inputNumber) {
        try {
            const formattedNumber = inputNumber.startsWith('+') ? inputNumber : '+' + inputNumber;
            const number = phoneUtil.parseAndKeepRawInput(formattedNumber, null);

            if (phoneUtil.isValidNumber(number)) {
                return phoneUtil.format(number, PNF.INTERNATIONAL);
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    inputList.forEach((item) => {
        const textError = item.closest('label').querySelector('[data-text-error]');
        item.addEventListener('input', () => {
            if (textError) {
                textError.textContent = '';
                item.classList.remove('error');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let errorFound = false;

        inputList.forEach((item) => {
            const textError = item.closest('label').querySelector('[data-text-error]');
            const value = item.value.trim();

            if (!value) {
                if (textError) textError.textContent = 'Try again';
                item.classList.add('error');
                errorFound = true;
                return;
            }

            if (item.type === 'tel') {
                const rawValue = item.value.replace(/[^\d+]/g, '');
                const prettyNumber = validateFullNumber(rawValue);

                if (!prettyNumber) {
                    if (textError) textError.textContent = 'Try again';
                    item.classList.add('error');
                    errorFound = true;
                } else {
                    item.value = prettyNumber;
                }
            }
        });

        if (!errorFound) {
            // form.submit();
            window.location.href = './payment.html';
        }
    });
};
