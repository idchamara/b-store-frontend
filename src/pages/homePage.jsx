
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import NavBar from "../components/navBar";

export default function HomePage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/product"
        );

        setProducts(response.data);
      } catch (error) {
        console.log("Product loading failed:", error);
        toast.error("Unable to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0
    }).format(price);

  return (
    <div className="min-h-screen bg-[#100606] text-white">

      {/* ================= NAVBAR ================= */}
      <NavBar/>
      {/* ================= HERO SECTION ================= */}

      <section className="relative min-h-[600px] flex items-center bg-[url(/Login-bg.jpg)] bg-cover bg-center">

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-red-950/30"></div>

        <div className="relative max-w-[1400px] mx-auto w-full px-8 py-24">

          <div className="max-w-[650px]">

            <span className="inline-block px-4 py-2 bg-red-900/30 border border-red-500/30 rounded-full text-red-400 text-xs tracking-widest mb-6">
              WELCOME TO B STORE
            </span>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              SHOP SMART.
              <br />
              <span className="text-red-600">
                LIVE BETTER.
              </span>
            </h1>

            <p className="text-gray-300 mt-7 text-base md:text-lg leading-8 max-w-[550px]">
              Discover quality products at amazing prices.
              Find everything you need in one place with
              the shopping experience you deserve.
            </p>

            <div className="flex flex-wrap gap-4 mt-9">

              <a
                href="#products"
                className="px-8 py-4 bg-red-700 hover:bg-red-600 rounded-xl font-bold shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300"
              >
                Explore Products →
              </a>

              <Link
                to="/register"
                className="px-8 py-4 border border-red-500/50 hover:bg-red-950/50 rounded-xl font-semibold transition"
              >
                Join Us
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* ================= FEATURES ================= */}

      <section className="max-w-[1400px] mx-auto px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          {[
            {
              icon: "🚀",
              title: "Fast Shopping",
              desc: "A simple and smooth shopping experience."
            },
            {
              icon: "💎",
              title: "Quality Products",
              desc: "Discover products selected for quality."
            },
            {
              icon: "🔒",
              title: "Secure Shopping",
              desc: "A convenient and secure shopping experience."
            }
          ].map((item, index) => (

            <div
              key={index}
              className="bg-red-950/20 border border-red-500/20 backdrop-blur-xl rounded-2xl p-7 hover:border-red-500/60 transition"
            >
              <div className="text-3xl mb-4">{item.icon}</div>

              <h3 className="font-bold text-lg">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* ================= PRODUCTS ================= */}

      <section id="products" className="max-w-[1400px] mx-auto px-6 py-16">

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10">

          <div>
            <p className="text-red-500 text-sm font-semibold tracking-widest">
              OUR COLLECTION
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Featured Products
            </h2>

            <p className="text-gray-400 mt-3">
              Explore our latest products and discover something special.
            </p>
          </div>

          {/* Search */}
          <div className="w-full md:w-[350px]">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search products..."
              className="w-full h-[50px] px-5 bg-red-950/20 border border-red-500/30 rounded-xl text-white placeholder-gray-500 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
            />

          </div>

        </div>


        {/* Product Grid */}
        {loading ? (

          <div className="flex flex-col justify-center items-center py-24">

            <div className="w-[55px] h-[55px] border-4 border-red-300/20 border-t-red-600 rounded-full animate-spin"></div>

            <p className="text-red-400 mt-5">
              Loading Products...
            </p>

          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="text-center py-24 bg-red-950/10 border border-red-500/20 rounded-2xl">

            <p className="text-4xl mb-4">🛍️</p>

            <h3 className="text-xl font-bold">
              No Products Found
            </h3>

            <p className="text-gray-400 mt-2">
              Try searching with another product name.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

            {filteredProducts.map((product) => (

              <div
                key={product.productId}
                className="group bg-red-950/20 border border-red-500/20 rounded-2xl overflow-hidden hover:border-red-500/60 hover:shadow-[0_0_25px_rgba(220,38,38,0.15)] transition-all duration-300"
              >

                {/* Product Image */}
                <div className="h-[240px] bg-black/40 overflow-hidden relative">

                  <img
                    src={
                      product.images?.[0] ||
                      "https://placehold.co/500x400/1a0808/ffffff?text=B+Store"
                    }
                    alt={product.productName}
                    className="w-full h-full object-contain p-5 group-hover:scale-110 transition-transform duration-500"
                  />

                  {product.stock > 0 ? (
                    <span className="absolute top-4 left-4 bg-green-900/80 text-green-300 text-xs px-3 py-1 rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span className="absolute top-4 left-4 bg-red-900/90 text-red-300 text-xs px-3 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}

                </div>


                {/* Product Details */}
                <div className="p-5">

                  <p className="text-gray-500 text-xs tracking-widest">
                    {product.productId}
                  </p>

                  <h3 className="font-bold text-lg mt-2 truncate">
                    {product.productName}
                  </h3>

                  <div className="flex items-center gap-3 mt-4">

                    <span className="text-red-500 text-xl font-bold">
                      {formatPrice(product.price)}
                    </span>

                    {product.labeledPrice > product.price && (
                      <span className="text-gray-500 text-sm line-through">
                        {formatPrice(product.labeledPrice)}
                      </span>
                    )}

                  </div>

                  <button
                    disabled={product.stock <= 0}
                    className="w-full mt-5 py-3 bg-red-800 hover:bg-red-600 disabled:bg-gray-700 disabled:text-gray-400 rounded-xl text-sm font-bold transition"
                  >
                    {product.stock > 0 ? "View Product →" : "Out of Stock"}
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* ================= ABOUT SECTION ================= */}

      <section id="about" className="px-6 py-20 bg-gradient-to-r from-red-950/30 via-black to-red-950/30 border-y border-red-500/10">

        <div className="max-w-[1000px] mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-black">
            WHY <span className="text-red-600">B STORE?</span>
          </h2>

          <p className="text-gray-400 mt-6 leading-8">
            B Store brings together quality, convenience and
            value in one shopping destination. Explore our
            collection and enjoy a simple way to discover
            products that fit your lifestyle.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 px-8 py-4 bg-red-700 hover:bg-red-600 rounded-xl font-bold shadow-[0_0_20px_rgba(220,38,38,0.3)] transition"
          >
            Start Shopping
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer id="footer" className="bg-black border-t border-red-500/20 px-6 py-10">

        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-5">

          <div>
            <h2 className="text-2xl font-black tracking-widest">
              B<span className="text-red-600">.</span>STORE
            </h2>

            <p className="text-gray-500 text-xs mt-2">
              Your shopping destination.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-sm text-gray-400">

            <a href="" className="hover:text-red-500 transition">
              Facebook
            </a>

            <a href="" className="hover:text-red-500 transition">
              Instagram
            </a>

            <Link to="" className="hover:text-red-500 transition">
              WhatsApp
            </Link>

          </div>

          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} ChamaraKumara. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}
