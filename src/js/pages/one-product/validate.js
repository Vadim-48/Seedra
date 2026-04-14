export const initFormValidate = () => {
    const form = document.getElementById('ask-form');
    const textArea = document.getElementById('question');
    const textError = document.getElementById('text-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const value = textArea.value.trim();

        if (!value) {
            textError.textContent = 'Try again';
            textArea.classList.add('error');
            return;
        }

        textError.textContent = '';
        textArea.classList.remove('error');
        form.submit();
    });

    textArea.addEventListener('input', () => {
        if (textArea.value.trim()) {
            textError.textContent = '';
            textArea.classList.remove('error');
        }
    });
}
