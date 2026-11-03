export default function Header() {
    return (
        <header className="w-full bg-gradient-to-r from-black via-red-900 to-red-500 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Logo / Store Name */}
                <h1 className="text-2xl font-extrabold tracking-wide">
                    B <span className="text-cyan-300">Store.</span>
                </h1>

                {/* Navigation */}
                <nav>
                    <ul className="flex items-center gap-2 sm:gap-6">
                        <li>
                            <a
                                href="/"
                                className="px-3 py-2 rounded-lg font-medium hover:bg-white/20 hover:text-cyan-200 transition duration-300"
                            >
                                Home
                            </a>
                        </li>

                        <li>
                            <a
                                href="/products"
                                className="px-3 py-2 rounded-lg font-medium hover:bg-white/20 hover:text-cyan-200 transition duration-300"
                            >
                                Products
                            </a>
                        </li>

                        <li>
                            <a
                                href="/about"
                                className="px-3 py-2 rounded-lg font-medium hover:bg-white/20 hover:text-cyan-200 transition duration-300"
                            >
                                About
                            </a>
                        </li>

                        <li>
                            <a
                                href="/contact"
                                className="px-3 py-2 rounded-lg font-medium hover:bg-white/20 hover:text-cyan-200 transition duration-300"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Shop Button */}
                <a
                    href="/products"
                    className="hidden md:inline-block bg-white text-blue-700 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-cyan-300 hover:scale-105 transition duration-300"
                >
                    Shop Now
                </a>

            </div>
        </header>
    );
}