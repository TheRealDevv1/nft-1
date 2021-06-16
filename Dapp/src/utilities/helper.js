export const formatPrice = (price) => {
    let num = price.split('.')[0];
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}