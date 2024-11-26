const calculateTotalPrice = useCallback((cartItems: CartItem[]) => {
  return cartItems.reduce(
    (total, item) =>
      total + item.quantity * item.product_instance.product.price,
    0
  );
}, []);

const totalPrice = calculateTotalPrice(bucket?.cart_items || []);
