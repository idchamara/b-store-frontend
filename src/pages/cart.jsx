
import { TbTrash } from "react-icons/tb";
import {
  FaShoppingBag,
  FaArrowLeft,
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaTag,
  FaCreditCard,
} from "react-icons/fa";

import getCart, {
  addToCart,
  getTotal,
  getTotalForLsbelPrice,
  removeFromCart,
} from "../../utils/cart";

import NavBar from "../components/navBar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cartLoaded) {
      const cartData = getCart();
      setCart(cartData);
      setCartLoaded(true);
    }
  }, [cartLoaded]);

  function refreshCart() {
    setCart(getCart());
  }

  const subtotal = getTotalForLsbelPrice();
  const netTotal = getTotal();
  const discount = subtotal - netTotal;

  function handleCheckout() {
    if (cart.length === 0) return;

    navigate("/checkout", {
      state: {
        item: cart,
      },
    });
  }

  return (
    <div className="min-h-screen bg-[#100606] text-white">
      <NavBar />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* Page Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition mb-5"
          >
            <FaArrowLeft />
            Continue Shopping
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Shopping <span className="text-red-500">Cart</span>
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Review your selected products before checkout.
              </p>
            </div>

            <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06]">
              <FaShoppingBag className="text-red-400 text-xl" />

              <div>
                <p className="text-xs text-gray-500">Your Cart</p>
                <p className="font-semibold text-sm">
                  {cart.reduce((total, item) => total + item.quantity, 0)} Items
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        {cartLoaded && cart.length === 0 && (
          <div className="min-h-[450px] flex items-center justify-center">
            <div className="max-w-md w-full text-center p-8 md:p-12 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/30 to-black/60 backdrop-blur-xl">

              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FaShoppingCart className="text-4xl text-red-500" />
              </div>

              <h2 className="text-2xl font-bold mb-3">
                Your Cart is Empty
              </h2>

              <p className="text-sm text-gray-400 leading-6 mb-8">
                Looks like you haven't added anything to your cart yet.
                Explore our collection and find something you love.
              </p>

              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-3 px-7 py-3 rounded-xl bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 font-semibold shadow-lg shadow-red-900/30 transition"
              >
                <FaShoppingBag />
                Start Shopping
              </Link>
            </div>
          </div>
        )}

        {/* Cart Content */}
        {cartLoaded && cart.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT - Cart Items */}
            <div className="lg:col-span-2 space-y-5">

              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">
                  Cart Items
                </h2>

                <span className="text-xs text-gray-500">
                  {cart.length} Products
                </span>
              </div>

              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="relative flex flex-col sm:flex-row gap-5 p-4 md:p-5 rounded-2xl border border-red-500/15 bg-gradient-to-br from-red-950/20 to-black/50 backdrop-blur-xl hover:border-red-500/30 transition"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-40 sm:h-32 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-black/30">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">

                    <div>
                      <h3 className="text-lg font-semibold text-gray-100 truncate">
                        {item.name}
                      </h3>

                      {item.altNames?.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {item.altNames.join(" | ")}
                        </p>
                      )}

                      <p className="text-sm text-red-400 font-semibold mt-3">
                        LKR {Number(item.price).toFixed(2)}
                        <span className="text-xs text-gray-500 font-normal ml-2">
                          / unit
                        </span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-5">

                      <div className="flex items-center gap-3 p-1.5 rounded-xl border border-white/10 bg-black/30">
                        <button
                          type="button"
                          disabled={item.quantity <= 1}
                          onClick={() => {
                            addToCart(item, -1);
                            refreshCart();
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        >
                          <FaMinus size={10} />
                        </button>

                        <span className="min-w-5 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            addToCart(item, 1);
                            refreshCart();
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-600 transition"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>

                      <p className="text-lg font-bold text-white">
                        LKR{" "}
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => {
                      removeFromCart(item.productId);
                      refreshCart();
                    }}
                    title="Remove product"
                    className="absolute top-3 right-3 sm:static sm:self-start sm:ml-2 w-9 h-9 shrink-0 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition cursor-pointer"
                  >
                    <TbTrash size={18} />
                  </button>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition pt-3"
              >
                <FaArrowLeft />
                Continue Shopping
              </Link>
            </div>

            {/* RIGHT - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 p-6 md:p-7 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/30 via-[#1b0b0b]/80 to-black/80 backdrop-blur-xl shadow-2xl shadow-black/30">

                <div className="flex items-center gap-3 mb-7">
                  <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <FaCreditCard className="text-red-400" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">
                      Order Summary
                    </h2>
                    <p className="text-xs text-gray-500">
                      Your purchase details
                    </p>
                  </div>
                </div>

                {/* Summary Details */}
                <div className="space-y-5">

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      Subtotal
                    </span>

                    <span className="font-semibold">
                      LKR {subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-2">
                      <FaTag className="text-green-500" />
                      Discount
                    </span>

                    <span className="font-semibold text-green-400">
                      - LKR {discount.toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-white/10 pt-5 flex justify-between items-center">
                    <span className="text-gray-300 font-semibold">
                      Net Total
                    </span>

                    <span className="text-xl font-bold text-red-400">
                      LKR {netTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Savings */}
                {discount > 0 && (
                  <div className="mt-6 p-3 rounded-xl border border-green-500/20 bg-green-500/[0.06]">
                    <p className="text-xs text-green-400 text-center">
                      Congratulations! You're saving LKR{" "}
                      {discount.toFixed(2)} on this order.
                    </p>
                  </div>
                )}

                {/* Checkout */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full mt-7 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-bold shadow-lg shadow-red-900/30 transition cursor-pointer"
                >
                  Proceed to Checkout
                  <FaCreditCard />
                </button>

                <p className="text-[11px] text-gray-500 text-center mt-4">
                  Shipping charges, if applicable, will be calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
