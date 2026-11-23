
import { useEffect, useMemo, useState } from "react";
import { TbTrash } from "react-icons/tb";
import {
  FaArrowLeft,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaMinus,
  FaPlus,
  FaCreditCard,
  FaTag,
  FaBoxOpen,
  FaCheckCircle,
} from "react-icons/fa";

import NavBar from "../components/navBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState(location.state?.item || []);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);

  // Keep cart data updated when quantity changes
  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.labeledPrice || item.price) * item.quantity,
      0
    );
  }, [cart]);

  const netTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.price) * item.quantity,
      0
    );
  }, [cart]);

  const discount = subtotal - netTotal;

  // Redirect if checkout was opened without cart data
  useEffect(() => {
    if (!location.state?.item) {
      toast.error("Please add products to your cart first");
      navigate("/products", { replace: true });
    }
  }, [location.state, navigate]);

  // Update item quantity
  function updateQuantity(index, change) {
    setCart((previousCart) =>
      previousCart.map((item, i) => {
        if (i !== index) return item;

        const newQuantity = Math.max(
          1,
          item.quantity + change
        );

        return {
          ...item,
          quantity: newQuantity,
        };
      })
    );
  }

  // Remove item
  function removeItem(productId) {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.productId !== productId
      )
    );

    toast.success("Item removed from checkout");
  }

  // Place order
  async function placeOrder(e) {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!name.trim() || !address.trim() || !phoneNumber.trim()) {
      toast.error("Please complete all delivery details");
      return;
    }

    if (!/^[0-9+\-\s]{9,15}$/.test(phoneNumber.trim())) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const orderData = {
      name: name.trim(),
      address: address.trim(),
      phoneNumber: phoneNumber.trim(),
      billItems: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login before placing your order");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order`,
        orderData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Order placed successfully");
      navigate("/");
    } catch (error) {
      console.error("Order placement error:", error);

      toast.error(
        error.response?.data?.message ||
          "Order placement failed"
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle =
    "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 pl-11 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500";

  if (!location.state?.item) {
    return (
      <div className="min-h-screen bg-[#100606]">
        <NavBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#100606] text-white">
      <NavBar />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition mb-5"
          >
            <FaArrowLeft />
            Back to Cart
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Secure <span className="text-red-500">Checkout</span>
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Complete your delivery details and place your order.
              </p>
            </div>

            <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.06]">
              <FaShoppingBag className="text-red-400 text-xl" />

              <div>
                <p className="text-xs text-gray-500">
                  Checkout Items
                </p>
                <p className="text-sm font-semibold">
                  {cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}{" "}
                  Items
                </p>
              </div>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Checkout */
          <div className="min-h-[450px] flex items-center justify-center">
            <div className="max-w-md w-full text-center p-10 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/30 to-black/60">
              <FaBoxOpen className="text-5xl text-red-500 mx-auto mb-6" />

              <h2 className="text-2xl font-bold mb-3">
                No Items to Checkout
              </h2>

              <p className="text-sm text-gray-400 mb-7">
                Your checkout list is empty. Please add some products first.
              </p>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-red-700 to-red-500 font-semibold"
              >
                <FaShoppingBag />
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={placeOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* LEFT SECTION */}
              <div className="lg:col-span-2 space-y-8">

                {/* Order Items */}
                <section className="p-5 md:p-7 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/25 to-black/60 backdrop-blur-xl">

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                        <FaShoppingBag className="text-red-400" />
                      </div>

                      <div>
                        <h2 className="text-lg font-bold">
                          Order Items
                        </h2>
                        <p className="text-xs text-gray-500">
                          Review your selected products
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-gray-400">
                      {cart.length} Products
                    </span>
                  </div>

                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div
                        key={item.productId}
                        className="relative flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-white/10 bg-black/30"
                      >
                        {/* Product Image */}
                        <div className="w-full sm:w-24 h-36 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-100 truncate pr-8">
                            {item.name}
                          </h3>

                          {item.altNames?.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {item.altNames.join(" | ")}
                            </p>
                          )}

                          <p className="text-sm text-red-400 font-semibold mt-3">
                            LKR {Number(item.price).toFixed(2)}
                            <span className="text-xs text-gray-500 ml-2 font-normal">
                              / unit
                            </span>
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">

                            {/* Quantity */}
                            <div className="flex items-center gap-3 p-1 rounded-lg border border-white/10 bg-black/30">
                              <button
                                type="button"
                                disabled={item.quantity <= 1}
                                onClick={() => updateQuantity(index, -1)}
                                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 hover:bg-red-600 disabled:opacity-30 transition"
                              >
                                <FaMinus size={10} />
                              </button>

                              <span className="min-w-5 text-center text-sm font-semibold">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() => updateQuantity(index, 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 hover:bg-red-600 transition"
                              >
                                <FaPlus size={10} />
                              </button>
                            </div>

                            <p className="font-bold text-white">
                              LKR{" "}
                              {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          title="Remove item"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition cursor-pointer"
                        >
                          <TbTrash size={17} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Delivery Details */}
                <section className="p-5 md:p-7 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/25 to-black/60 backdrop-blur-xl">

                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                      <FaMapMarkerAlt className="text-red-400" />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold">
                        Delivery Information
                      </h2>
                      <p className="text-xs text-gray-500">
                        Where should we deliver your order?
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">

                    {/* Name */}
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Full Name *
                      </label>

                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={inputStyle}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Delivery Address *
                      </label>

                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-500" />

                        <textarea
                          required
                          rows="4"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className={`${inputStyle} resize-none`}
                          placeholder="Enter your complete delivery address"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">
                        Phone Number *
                      </label>

                      <div className="relative">
                        <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                        <input
                          required
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className={inputStyle}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* RIGHT SECTION - SUMMARY */}
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
                        Final payment details
                      </p>
                    </div>
                  </div>

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

                  {discount > 0 && (
                    <div className="mt-6 p-3 rounded-xl border border-green-500/20 bg-green-500/[0.06]">
                      <p className="text-xs text-green-400 text-center">
                        You're saving LKR {discount.toFixed(2)}!
                      </p>
                    </div>
                  )}

                  {/* Place Order */}
                  <button
                    type="submit"
                    disabled={loading || cart.length === 0}
                    className="w-full mt-7 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-bold shadow-lg shadow-red-900/30 transition disabled:opacity-50 disabled:cursor-not-allowed  cursor-pointer"
                  >
                    <FaCheckCircle />

                    {loading ? "Placing Order..." : "Place Order"}
                  </button>

                  <p className="text-[11px] text-gray-500 text-center mt-4 leading-5">
                    Please verify your delivery details before placing your order.
                  </p>

                  <div className="flex items-center justify-center gap-2 mt-6 pt-5 border-t border-white/10 text-xs text-gray-500">
                    <FaCheckCircle className="text-green-500" />
                    Secure order submission
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
