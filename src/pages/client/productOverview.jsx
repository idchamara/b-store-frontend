
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import NavBar from "../../components/navBar";
import Loader from "../../components/loader";
import ImageSlider from "../../components/ImageSlider";
import { addToCart } from "../../../utils/cart";

import {
  FaArrowLeft,
  FaShoppingCart,
  FaBolt,
  FaMinus,
  FaPlus,
  FaBoxOpen,
  FaCheckCircle,
  FaTag,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

export default function ProductOverview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) {
      navigate("/products", { replace: true });
      return;
    }

    let isMounted = true;

    async function fetchProduct() {
      setStatus("loading");

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`
        );

        if (isMounted) {
          setProduct(res.data.product);
          setStatus("loaded");
        }
      } catch (error) {
        if (isMounted) {
          console.error("Product loading error:", error);
          toast.error("Product is not available");
          setStatus("error");
        }
      }
    }

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  function handleAddToCart(redirect = false) {
    if (!product || product.stock <= 0) return;

    if (redirect) {
      navigate("/checkout", {
        state : {
          item : [
            {
              productId : product.productId,
              name : product.productName,
              altNames : product.altNames,
              price : product.price,
              labeledPrice : product.labeledPrice,
              image : product.images[0],
              quantity : 1

            }
          ]
        }
      });
    }else{
      addToCart(product, quantity);
      toast.success("Product added to cart");
    }

  }

  const isDiscounted =
    product && product.labeledPrice > product.price;

  const discountPercentage = isDiscounted
    ? Math.round(
        ((product.labeledPrice - product.price) /
          product.labeledPrice) *
          100
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#100606] text-white">
      <NavBar />

      {/* Loading */}
      {status === "loading" && (
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Product Content */}
      {status === "loaded" && product && (
        <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">

          {/* Back Navigation */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition mb-8"
          >
            <FaArrowLeft />
            Back to Products
          </Link>

          {/* Main Product Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-4 md:p-8 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/30 via-[#1b0b0b]/80 to-black/80 backdrop-blur-xl shadow-2xl shadow-black/40">

            {/* LEFT - Product Images */}
            <div className="relative">

              {/* Discount Badge */}
              {isDiscounted && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-bold shadow-lg shadow-red-900/40">
                  <FaTag />
                  {discountPercentage}% OFF
                </div>
              )}

              <div className="h-full min-h-[350px] flex items-center justify-center p-3 md:p-6 rounded-2xl border border-white/10 bg-black/30">
                <div className="w-full">
                  <ImageSlider images={product.images || []} />
                </div>
              </div>

              {/* Product Image Caption */}
              <p className="text-center text-xs text-gray-500 mt-4">
                Premium quality product from B.STORE
              </p>
            </div>

            {/* RIGHT - Product Information */}
            <div className="flex flex-col justify-center py-3 md:py-6">

              {/* Product ID */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="text-xs tracking-widest uppercase text-gray-500">
                  Product Details
                </span>

                <span className="text-xs text-gray-400 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  ID: {product.productId}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                {product.productName}
              </h1>

              {/* Alternative Names */}
              {product.altNames?.length > 0 && (
                <p className="text-sm text-gray-500 mb-6">
                  {product.altNames.join(" | ")}
                </p>
              )}

              {/* Price Section */}
              <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/[0.06] mb-7">
                <div className="flex flex-wrap items-center gap-4">

                  <div>
                    <p className="text-xs text-gray-400 mb-2">
                      Our Price
                    </p>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-red-500">
                      LKR {Number(product.price).toFixed(2)}
                    </h2>
                  </div>

                  {isDiscounted && (
                    <div className="ml-auto">
                      <p className="text-xs text-gray-500 mb-2">
                        Regular Price
                      </p>

                      <p className="text-lg text-gray-500 line-through">
                        LKR {Number(product.labeledPrice).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>

                {isDiscounted && (
                  <p className="text-sm text-green-400 mt-4">
                    You save LKR{" "}
                    {(
                      product.labeledPrice - product.price
                    ).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-3 mb-6">
                {product.stock > 0 ? (
                  <>
                    <FaCheckCircle className="text-green-500" />
                    <span className="text-sm text-green-400">
                      In Stock
                    </span>
                    <span className="text-xs text-gray-500">
                      ({product.stock} available)
                    </span>
                  </>
                ) : (
                  <>
                    <FaBoxOpen className="text-red-500" />
                    <span className="text-sm text-red-400">
                      Currently Out of Stock
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-200 mb-3">
                  Product Description
                </h3>

                <p className="text-sm leading-7 text-gray-400 whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-7">
                  <p className="text-sm text-gray-300 mb-3">
                    Select Quantity
                  </p>

                  <div className="inline-flex items-center gap-5 p-2 rounded-xl border border-white/10 bg-black/30">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() =>
                        setQuantity((previous) =>
                          Math.max(1, previous - 1)
                        )
                      }
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <FaMinus size={12} />
                    </button>

                    <span className="min-w-6 text-center font-bold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      disabled={quantity >= product.stock}
                      onClick={() =>
                        setQuantity((previous) =>
                          Math.min(product.stock, previous + 1)
                        )
                      }
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">

                {product.stock > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(false)}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 text-white font-semibold shadow-lg shadow-red-900/30 transition cursor-pointer"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(true)}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold transition  cursor-pointer"
                    >
                      <FaBolt />
                      Buy Now
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="w-full px-6 py-4 rounded-xl bg-gray-800 text-gray-500 font-semibold cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                )}
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10 ">
                <div className="flex items-center gap-3">
                  <FaTruck className="text-red-400 text-xl" />
                  <div>
                    <p className="text-xs font-semibold text-gray-300">
                      Delivery
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Convenient delivery
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-red-400 text-xl" />
                  <div>
                    <p className="text-xs font-semibold text-gray-300">
                      Secure Shopping
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Shop with confidence
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="min-h-[70vh] flex items-center justify-center px-5">
          <div className="max-w-md w-full text-center p-8 rounded-2xl border border-red-500/20 bg-red-950/20 backdrop-blur-xl">
            <FaBoxOpen className="text-5xl text-red-500 mx-auto mb-5" />

            <h2 className="text-2xl font-bold mb-3">
              Product Not Found
            </h2>

            <p className="text-sm text-gray-400 mb-7">
              Sorry, this product is currently unavailable or may have been removed.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 font-semibold transition"
            >
              <FaArrowLeft />
              Browse Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
