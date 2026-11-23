import { MdOutlineLogin } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <nav className="w-full bg-black/60 backdrop-blur-xl border-b border-red-500/20 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-3xl font-black tracking-widest">
          B<span className="text-red-600">.</span>STORE
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">
          <Link
            to="/"
            className="hover:text-red-500 transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-red-500 transition"
          >
            Products
          </Link>

          <a href="#about" className="hover:text-red-500 transition">
            About
          </a>

          <a href="#footer" className="hover:text-red-500 transition">
            Contact us
          </a>
        </div>

        {/*Right side actions */ }
        <div className="flex items-center gap-5">
          {/* Cart Icon */}
          <Link 
          to="/cart"
          className="text-red-700 text-3xl cursor-pointer hover:text-red-600 relative">
            <TiShoppingCart/>
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
              {cart.length}
            </span>
          </Link>

          {/* Login / Register */}
          {!token && (
            <div className="flex items-center gap-3">
              <Link
              to="/login"
              className="px-5 py-2 text-sm text-white hover:text-red-400 transition"
              >
                Login
              </Link>

              <Link
              to="/register"
              className="px-5 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-sm font-semibold shadow-[0_0_15px_rgba(220,38,38,0.3)] transition"
              >
                Register
              </Link>
            
            </div>
          )}
        
          {/* Log out button */}
          {
            token && (
              <div className="flex items-center">
                <div className="text-red-700 text-3xl cursor-pointer hover:text-red-600">
                  <MdOutlineLogin onClick={Logout} />
                </div>
              </div>
            )
          }
        </div>
      </div>
    </nav>
  );
}