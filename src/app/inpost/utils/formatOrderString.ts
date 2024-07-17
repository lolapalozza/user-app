export const formatOrderString = (order, products) => {

  const productDict = {};
  products.forEach(product => {
    productDict[product.id] = product.short_description;
  });

  const parts = [];

  for (const productId in order) {
    const shortDescription = productDict[productId];
    if (shortDescription) {
      parts.push(`${shortDescription} - ${order[productId]}`);
    }
  }

  return parts.join(', ');
}
