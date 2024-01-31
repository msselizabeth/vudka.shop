

export function calcMainPrice(price) {
    return parseFloat(price) * parseFloat(process.env.NEXT_PUBLIC_EXCHANGE_MAIN);
}

export function calcSalePrice(price) {
    return (
      parseFloat(price) * parseFloat(process.env.NEXT_PUBLIC_EXCHANGE_SALE)
    );
}

export function calcAlwaysSalePrice(price) {
    return (
      parseFloat(price) *
      parseFloat(process.env.NEXT_PUBLIC_EXCHANGE_ALWAYS_SALE)
    );
}