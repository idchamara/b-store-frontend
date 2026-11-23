
import { NavLink, Link, Route, Routes } from "react-router-dom";

import { FaRegUser } from "react-icons/fa";
import { MdOutlineWarehouse } from "react-icons/md";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

import AdminProductsPage from "./admin/product";
import AdminUsersPage from "./admin/user";
import AddProductForm from "./admin/addProduct";
import EditProductForm from "./admin/editProduct";
import AdminOrderPage from "./admin/order";

export default function AdminPage() {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/admin",
            icon: <IoHomeOutline />
        },
        {
            name: "Manage Users",
            path: "/admin/users",
            icon: <FaRegUser />
        },
        {
            name: "Manage Products",
            path: "/admin/products",
            icon: <MdOutlineWarehouse />
        },
        {
            name: "Manage Orders",
            path: "/admin/orders",
            icon: <LiaFileInvoiceSolid />
        }
    ];

    return (

        <div className="w-full h-screen flex bg-[#100606] overflow-hidden">

            {/* ================= SIDEBAR ================= */}

            <aside className="w-[260px] h-full flex flex-col bg-gradient-to-b from-[#190707] via-[#100606] to-black border-r border-red-500/20 shrink-0">

                {/* Logo */}
                <div className="h-[100px] flex flex-col justify-center px-7 border-b border-red-500/20">

                    <Link to="/" className="text-3xl font-black tracking-widest text-white">
                        B<span className="text-red-600">.</span>STORE
                    </Link>

                    <p className="text-red-400 text-xs tracking-[4px] mt-1">
                        ADMIN PANEL
                    </p>

                </div>


                {/* Admin Profile */}
                <div className="mx-4 mt-7 mb-7 p-4 rounded-xl bg-red-950/30 border border-red-500/20 flex items-center gap-3">

                    <div className="w-11 h-11 rounded-full bg-red-700 flex justify-center items-center text-xl font-bold shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                        A
                    </div>

                    <div>
                        <h3 className="text-white text-sm font-semibold">
                            Administrator
                        </h3>

                        <p className="text-green-400 text-xs mt-1 s animate-pulse">
                            ● Online
                        </p>
                    </div>

                </div>


                {/* Navigation */}
                <div className="px-4">

                    <p className="text-gray-500 text-xs font-semibold tracking-widest px-3 mb-4">
                        MAIN MENU
                    </p>

                    <nav className="flex flex-col gap-2">

                        {menuItems.map((item, index) => (

                            <NavLink
                                key={index}
                                to={item.path}
                                end={item.path === "/admin"}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all duration-300
                                    ${
                                        isActive
                                        ? "bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] border border-red-500/40"
                                        : "text-gray-400 hover:text-white hover:bg-red-950/40"
                                    }`
                                }
                            >

                                <span className="text-xl">
                                    {item.icon}
                                </span>

                                <span className="font-medium">
                                    {item.name}
                                </span>

                            </NavLink>

                        ))}

                    </nav>

                </div>


                {/* Bottom Section */}
                <div className="mt-auto p-4 border-t border-red-500/20">

                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-950/30 transition"
                    >
                        <FiLogOut className="text-xl" />

                        <span className="text-sm font-medium">
                            Back to Store
                        </span>
                    </Link>

                    <p className="text-gray-600 text-xs text-center mt-5">
                        B Store Admin v1.0
                    </p>

                </div>

            </aside>


            {/* ================= MAIN CONTENT ================= */}

            <main className="flex-1 min-w-0 h-full flex flex-col p-3 md:p-5 overflow-hidden">

                {/* Top Header */}
                <header className="w-full min-h-[75px] bg-red-950/20 backdrop-blur-xl border border-red-500/20 rounded-2xl flex justify-between items-center px-4 md:px-7 mb-5 shrink-0">

                    <div>
                        <h2 className="text-white text-lg md:text-xl font-bold">
                            B Store Management
                        </h2>

                        <p className="text-gray-500 text-xs mt-1">
                            Manage your online store
                        </p>
                    </div>

                    <Link
                        to="/"
                        className="px-4 md:px-5 py-2 bg-red-800 hover:bg-red-600 text-white text-xs md:text-sm rounded-lg transition"
                    >
                        Visit Store ↗
                    </Link>

                </header>


                {/* Dynamic Page Content */}
                <div className="flex-1 min-h-0 bg-[#160909] border border-red-500/20 rounded-2xl overflow-auto">

                    <Routes>

                        {/* Dashboard Home */}
                        <Route
                            path="/"
                            element={

                                <div className="min-h-full flex justify-center items-center p-6 bg-[url(/Login-bg.jpg)] bg-cover bg-center relative">

                                    <div className="absolute inset-0 bg-black/75"></div>

                                    <div className="relative text-center max-w-[650px]">

                                        <div className="text-6xl mb-7">
                                            🛍️
                                        </div>

                                        <p className="text-red-500 text-sm tracking-[5px] font-bold">
                                            ADMINISTRATION
                                        </p>

                                        <h1 className="text-3xl md:text-5xl font-black text-white mt-5 leading-tight">
                                            WELCOME TO
                                            <span className="text-red-600 block mt-2">
                                                B STORE ADMIN
                                            </span>
                                        </h1>

                                        <p className="text-gray-400 mt-6 leading-7">
                                            Manage your products, users and orders
                                            from one central dashboard.
                                            Welcome back to your management panel.
                                        </p>

                                        <div className="flex flex-wrap justify-center gap-4 mt-9">

                                            <Link
                                                to="/admin/products"
                                                className="px-7 py-3 bg-red-700 hover:bg-red-600 rounded-xl text-white font-semibold shadow-[0_0_20px_rgba(220,38,38,0.3)] transition"
                                            >
                                                Manage Products
                                            </Link>

                                            <Link
                                                to="/admin/users"
                                                className="px-7 py-3 border border-red-500/50 hover:bg-red-950/50 rounded-xl text-white font-semibold transition"
                                            >
                                                Manage Users
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            }
                        />

                        {/* Users */}
                        <Route
                            path="/users"
                            element={<AdminUsersPage />}
                        />

                        {/* Products */}
                        <Route
                            path="/products"
                            element={<AdminProductsPage />}
                        />

                        {/* Orders */}
                        <Route
                            path="/orders"
                            element={<AdminOrderPage/>}
                        />

                        {/* Add Product */}
                        <Route
                            path="/addProduct"
                            element={<AddProductForm />}
                        />

                        {/* Edit Product */}
                        <Route
                            path="/editProduct"
                            element={<EditProductForm />}
                        />

                    </Routes>

                </div>

            </main>

        </div>
    );
}
