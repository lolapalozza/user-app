export const formatToOrderDTO = (cartItems) => {
  const result = Object.entries(cartItems).map(([productId, quantity]) => ({
    productId: Number(productId),
    quantity
  }));
  return result
}
