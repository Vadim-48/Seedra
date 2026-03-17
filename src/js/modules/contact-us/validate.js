export const initFormValidate = () => {
    const form = document.getElementById('request-form');
    const labels = form.querySelectorAll('.contact-us__form-label');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let formError = false;

        labels.forEach((label) => {
            const formInput = label.querySelector('.contact-us__form-input');
            const value = formInput.value.trim();

            if (!value && (formInput.type !== 'email')) {
                label.classList.add('error');
                // formInput.placeholder = "Typing....";
                formError = true;
            } else if (formInput.type === 'email' && !emailPattern.test(value)) {
                label.classList.add('error');
                // formInput.placeholder = "Typing....";
                formError = true;
            } else {
                label.classList.remove('error');
                // formInput.placeholder = "";
            }

        })
        if (!formError) {
            form.submit();
        }

    });
    labels.forEach((label) => {
        const formInput = label.querySelector('.contact-us__form-input');

        formInput.addEventListener('input', e => {
            const value = formInput.value.trim();
            if (label.classList.contains('error')) {
                if (value && (formInput.type !== 'email')) {
                    label.classList.remove('error');
                }
                if (formInput.type === 'email' && emailPattern.test(value)) {
                    label.classList.remove('error');
                }
            }
        })
    })

}


