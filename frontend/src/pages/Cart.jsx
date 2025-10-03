function Cart({ cart, updateQty }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-3">
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >-</button>
                <span>{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="px-2 py-1 bg-gray-300 rounded"
                >+</button>
              </div>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <hr className="my-3"/>
          <h3 className="font-bold text-lg">Total: ₹{totalPrice}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;
