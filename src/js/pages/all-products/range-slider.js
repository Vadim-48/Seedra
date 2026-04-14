import noUiSlider from 'nouislider';

export const initRangeSlider = () => {
    const sliders = document.querySelectorAll('[data-range-slider]');

    sliders.forEach((rangeSlider) => {
        const wrapper = rangeSlider.closest('.filter-form__price-wrap');
        const priceMin = wrapper.querySelector('[data-price-min]');
        const priceMax = wrapper.querySelector('[data-price-max]');
        const prices = [priceMin, priceMax];

        noUiSlider.create(rangeSlider, {
            start: [
                Number(priceMin.value) || 1,
                Number(priceMax.value) || 1000
            ],
            connect: true,
            step: 1,
            range: {
                min: 1,
                max: 1000
            }
        });

        rangeSlider.noUiSlider.on('update', (values, handle) => {
            prices[handle].value = Math.round(values[handle]);
        });

        const setRangeSlider = (i, value) => {
            let arr = [null, null];
            arr[i] = Number(value);
            rangeSlider.noUiSlider.set(arr);
        };

        prices.forEach((price, index) => {
            price.addEventListener('change', (e) => {
                setRangeSlider(index, e.currentTarget.value);
            });
        });
    });
};