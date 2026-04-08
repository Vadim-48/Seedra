import Cleave from 'cleave.js/dist/cleave-esm.js';
import cardValidator from 'card-validator';

export const initPaymentFormValidate = () => {
    const form = document.getElementById('payment-form');
    if (!form) return;

    const cardInput = form.querySelector('[data-payment-card]');
    const dateInput = form.querySelector('[data-payment-date]');
    const cvvInput = form.querySelector('[data-payment-cvv]');
    const cardIcons = form.querySelectorAll('[data-card-type]');
    const submitBtn = document.querySelector('.payment-info__btn');

    const validateField = (input, result) => {
        const label = input.closest('label');
        const errSpan = label ? label.querySelector('[data-text-error]') : null;

        if (!result.isValid) {
            input.classList.add('error');
            if (errSpan) errSpan.textContent = 'Try again';
            return false;
        } else {
            input.classList.remove('error');
            if (errSpan) errSpan.textContent = '';
            return true;
        }
    };

    const cleaveCard = new Cleave(cardInput, {
        creditCard: true,
        onCreditCardTypeChanged: (type) => {
            if (type !== 'unknown') {
                cardIcons.forEach(icon => {
                    const iconType = icon.getAttribute('data-card-type');
                    icon.classList.toggle('active', iconType === type);
                });
            }
        }
    });

    new Cleave(dateInput, {
        date: true,
        datePattern: ['m', 'y']
    });

    new Cleave(cvvInput, {
        numericOnly: true,
        blocks: [3]
    });

    cardIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            cardIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');

            cleaveCard.setRawValue('');
            dateInput.value = '';
            cvvInput.value = '';

            [cardInput, dateInput, cvvInput].forEach(input => {
                input.classList.remove('error');
                const errSpan = input.closest('label')?.querySelector('[data-text-error]');
                if (errSpan) errSpan.textContent = '';
            });
        });
    });

    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const activeIcon = form.querySelector('[data-card-type].active');
            const activeType = activeIcon?.getAttribute('data-card-type');

            if (activeType === 'applepay' || activeType === 'paypal') {
                window.location.href = './payment.html';
                return;
            }

            const isCardValid = validateField(cardInput, cardValidator.number(cardInput.value));
            const isDateValid = validateField(dateInput, cardValidator.expirationDate(dateInput.value));
            const isCvvValid = validateField(cvvInput, cardValidator.cvv(cvvInput.value));

            if (isCardValid && isDateValid && isCvvValid) {
                window.location.href = './payment.html';
            }
        });
    }

    [cardInput, dateInput, cvvInput].forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const errSpan = input.closest('label')?.querySelector('[data-text-error]');
            if (errSpan) errSpan.textContent = '';
        });
    });
};
