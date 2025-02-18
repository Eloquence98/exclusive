export function formatCurrency(price) {
  const formater = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formater.format(price);
}

export function getTotalPrice(arrayToReduce = []) {
  const totalPrice = arrayToReduce.reduce((acc, cur) => {
    return acc + cur?.price || 0;
  }, 0);

  return totalPrice;
}
