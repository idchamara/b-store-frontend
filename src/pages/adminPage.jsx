import { Link, Route, Routes } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineWarehouse } from "react-icons/md";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import AdminProductsPage from "./admin/product";
import AdminUsersPage from "./admin/user";
import AddProductForm from "./admin/addProduct";

export default function AdminPage(){
    return(
        <div className="w-full h-screen flex p-[2px] bg-gradient-to-r from-black via-red-900 to-red-600">
            <div className="w-[300px] h-full pt-2 ">

                <Link to = "/" className = "flex items-center p-2 text-white"><IoHomeOutline className="mr-2"/>Home Page</Link>
                <Link to = "/admin/users" className = "flex items-center p-2 text-white"><FaRegUser className="mr-2"/>Manage Users</Link>
                <Link to = "/admin/products" className = "flex items-center p-2 text-white"><MdOutlineWarehouse className="mr-2"/>Manage Products</Link>
                <Link to = "/admin/orders" className = "flex items-center p-2 text-white"><LiaFileInvoiceSolid className="mr-2"/>Manage Orders</Link>

            </div>
            <div className="w-[calc(100vw-300px)] h-full bg-white rounded-lg">
                <Routes path = "/*">
                <Route path="/" element={<h1 className="text-7xl text-center p-10">Welcome to B-Store Admin Dashboard...🙏</h1>}/>
                <Route path="/users" element={<AdminUsersPage/>}/>
                <Route path="/products" element={<AdminProductsPage/>}/>
                <Route path="/orders" element={<h1>Orders</h1>}/>
                <Route path="/addProduct" element={<AddProductForm/>}/>
                </Routes>
            </div>
        </div>
    );
}