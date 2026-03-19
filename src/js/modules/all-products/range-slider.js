import noUiSlider from 'nouislider';

export const initRangeSlider = () => {
    const rangeSlider = document.getElementById('range-slider');
    if (rangeSlider) {
        noUiSlider.create(rangeSlider, {
            start: [1, 1000],
            connect: true,
            step: 1,
            range: {
                'min': [1],
                'max': [1000]
            }
        });

        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        const prices = [priceMin, priceMax];

        rangeSlider.noUiSlider.on('update', function (values, handle) {
            prices[handle].value = Math.round(values[handle]);
        });

        const setRangerSlider = (i, value) => {
            let arr = [null, null];
            arr[i] = value;

            rangeSlider.noUiSlider.set(arr);
        };

        prices.forEach((price,index) => {
            price.addEventListener('change', (e) => {
                setRangerSlider(index, e.currentTarget.value);
            });
        });
    }
};