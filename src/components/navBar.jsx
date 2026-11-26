
import { useState } from "react";
import {
    MdOutlineLogin,
    MdMenu,
    MdClose,
    MdKeyboardArrowDown
} from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {

    const token = localStorage.getItem("token");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const navigate = useNavigate();
    const location = useLocation();

    const [mobileMenu, setMobileMenu] = useState(false);

    function Logout() {
        localStorage.removeItem("token");
        setMobileMenu(false);
        navigate("/");
    }

    function closeMenu() {
        setMobileMenu(false);
    }

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
    ];

    function isActive(path) {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    }

    return (
        <nav className="w-full sticky top-0 z-50
            bg-[#100808]/90 backdrop-blur-2xl
            border-b border-red-900/30 shadow-lg shadow-black/20">

            <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12">

                <div className="h-[75px] flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="text-2xl sm:text-3xl font-black
                        tracking-[3px] text-white shrink-0"
                    >
                        B<span className="text-red-600">.</span>STORE
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-9">

                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative text-sm font-semibold
                                tracking-wide transition-all duration-300
                                group py-2
                                ${
                                    isActive(link.path)
                                        ? "text-red-500"
                                        : "text-gray-300 hover:text-red-500"
                                }`}
                            >
                                {link.name}

                                <span className={`absolute bottom-0 left-0
                                    h-[2px] bg-red-600 transition-all duration-300
                                    ${
                                        isActive(link.path)
                                            ? "w-full"
                                            : "w-0 group-hover:w-full"
                                    }`} />
                            </Link>
                        ))}

                        <a
                            href="/#about"
                            className="text-sm font-semibold text-gray-300
                            hover:text-red-500 transition"
                        >
                            About
                        </a>

                        <a
                            href="/#footer"
                            className="text-sm font-semibold text-gray-300
                            hover:text-red-500 transition"
                        >
                            Contact Us
                        </a>

                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3 sm:gap-5">

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative w-11 h-11 flex items-center
                            justify-center rounded-xl
                            bg-red-950/40 border border-red-900/30
                            text-red-500 hover:bg-red-900/40
                            hover:border-red-600/50 transition-all duration-300"
                        >
                            <TiShoppingCart size={27} />

                            <span className="absolute -top-2 -right-2
                                min-w-5 h-5 px-1 rounded-full
                                bg-red-600 text-white text-[10px]
                                font-bold flex items-center justify-center
                                border-2 border-[#100808]">
                                {cart.length}
                            </span>
                        </Link>

                        {/* Desktop Authentication */}
                        {!token ? (
                            <div className="hidden sm:flex items-center gap-3">

                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-semibold
                                    text-gray-300 hover:text-white transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="px-5 py-2.5 rounded-xl
                                    bg-gradient-to-r from-red-800 to-red-600
                                    hover:from-red-700 hover:to-red-500
                                    text-white text-sm font-bold
                                    shadow-[0_0_20px_rgba(220,38,38,0.2)]
                                    hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]
                                    transition-all duration-300"
                                >
                                    Register
                                </Link>

                            </div>
                        ) : (
                            <button
                                onClick={Logout}
                                className="hidden sm:flex items-center gap-2
                                px-4 py-2.5 rounded-xl
                                border border-red-800/40
                                bg-red-950/30 text-red-400
                                hover:bg-red-700 hover:text-white
                                hover:border-red-600 transition-all duration-300"
                            >
                                <MdOutlineLogin size={21} />
                                <span className="text-sm font-semibold">
                                    Logout
                                </span>
                            </button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="lg:hidden w-11 h-11 flex items-center
                            justify-center rounded-xl
                            border border-red-900/40 bg-red-950/30
                            text-white hover:bg-red-900/40 transition"
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileMenu}
                        >
                            {mobileMenu
                                ? <MdClose size={26} />
                                : <MdMenu size={26} />
                            }
                        </button>

                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`lg:hidden overflow-hidden transition-all
                duration-300 ease-in-out
                ${
                    mobileMenu
                        ? "max-h-[450px] opacity-100 border-t border-red-900/30"
                        : "max-h-0 opacity-0"
                }`}>

                <div className="px-6 py-5 bg-[#160909]/95
                    backdrop-blur-2xl flex flex-col gap-2">

                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={closeMenu}
                            className={`px-4 py-3 rounded-xl text-sm
                            font-semibold transition
                            ${
                                isActive(link.path)
                                    ? "bg-red-900/30 text-red-400 border border-red-800/30"
                                    : "text-gray-300 hover:bg-red-950/40 hover:text-red-400"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <a
                        href="/#about"
                        onClick={closeMenu}
                        className="px-4 py-3 rounded-xl text-sm font-semibold
                        text-gray-300 hover:bg-red-950/40 hover:text-red-400 transition"
                    >
                        About
                    </a>

                    <a
                        href="/#footer"
                        onClick={closeMenu}
                        className="px-4 py-3 rounded-xl text-sm font-semibold
                        text-gray-300 hover:bg-red-950/40 hover:text-red-400 transition"
                    >
                        Contact Us
                    </a>

                    <div className="border-t border-red-900/30 my-2" />

                    {!token ? (
                        <div className="grid grid-cols-2 gap-3">

                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="py-3 text-center rounded-xl
                                border border-red-800/40 text-white
                                hover:bg-red-950/50 transition text-sm font-semibold cursor-pointer"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                onClick={closeMenu}
                                className="py-3 text-center rounded-xl
                                bg-red-700 hover:bg-red-600
                                text-white transition text-sm font-bold cursor-pointer"
                            >
                                Register
                            </Link>

                        </div>
                    ) : (
                        <button
                            onClick={Logout}
                            className="w-full flex items-center justify-center gap-2
                            py-3 rounded-xl bg-red-900/30
                            border border-red-800/40 text-red-400
                            hover:bg-red-700 hover:text-white transition
                            text-sm font-semibold cursor-pointer"
                        >
                            <MdOutlineLogin size={21} />
                            Logout
                        </button>
                    )}

                </div>
            </div>

        </nav>
    );
}
