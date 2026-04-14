import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';

export const initFormValidate = () => {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    const inputList = form.querySelectorAll('input');

    function validateFullNumber(inputNumber) {
        try {
            const phoneNumber = parsePhoneNumberFromString(inputNumber.startsWith('+') ? inputNumber : '+' + inputNumber);

            if (phoneNumber && phoneNumber.isValid()) {
                return phoneNumber.formatInternational();
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    inputList.forEach((item) => {
        const textError = item.closest('label').querySelector('[data-text-error]');
        item.addEventListener('input', (e) => {
            if (textError) {
                textError.textContent = '';
                item.classList.remove('error');
            }
            if (item.type === 'tel') {
                let value = item.value;
                if (value.length > 0 && !value.startsWith('+')) {
                    value = '+' + value.replace(/[^\d]/g, '');
                }
                const formatted = new AsYouType().input(value);
                item.value = (formatted === '+') ? '' : formatted;

                // const cleanValue = item.value.replace(/[^\d]/g, '');
                // const phoneNumber = parsePhoneNumberFromString(item.value);
                const phoneNumber = parsePhoneNumberFromString(item.value);
                const digitsOnly = item.value.replace(/[^\d]/g, '');

                if (phoneNumber && digitsOnly.length > 4) {
                    if (!phoneNumber.isPossible()) {
                        if (textError) textError.textContent = 'Try again';
                        item.classList.add('error');
                    }
                }
                // if (phoneNumber) {
                //     if (cleanValue.length > 10) {
                //         if (!phoneNumber.isValid()) {
                //             if (textError) textError.textContent = 'Try again';
                //             item.classList.add('error');
                //         } else {
                //             if (textError) textError.textContent = '';
                //             item.classList.remove('error');
                //         }
                //     }
                // }
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
