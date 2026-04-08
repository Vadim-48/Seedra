export function formatMoney(amount) {
    return "$" + Number(amount)
        .toLocaleString('uk-UA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    // .replace(',', '.');
}