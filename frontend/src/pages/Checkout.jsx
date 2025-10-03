import axios from "axios";

function Checkout({ cart, clearCart }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    axios.post("http://localhost:5000/checkout", { cart })
      .then(res => {
        alert(res.data.message);
        clearCart();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <p key={item.id}>{item.name} x {item.qty} = ₹{item.price * item.qty}</p>
          ))}
          <hr className="my-3"/>
          <h3 className="font-bold">Total: ₹{totalPrice}</h3>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;
