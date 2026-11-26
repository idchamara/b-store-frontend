import axios from "axios"
import { useEffect, useState } from "react"
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

import Loader from "../../components/loader";

export default function AdminOrderPage(){
    const [orders, setOrders] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [modelDisplaying, setModelDisplaying] = useState(false)
    const [displayinfOrder, setDisplayingOrder] = useState(null)

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token")
            axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                headers : {
                    Authorization : "Bearer "+token
                }
            })
            .then((responce) => {
                console.log(responce.data)
                setOrders(responce.data)
                setLoaded(true)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [loaded]);

    function changeOrderStatus(orderId, status) {
        const token = localStorage.getItem("token")
        axios
        .put(import.meta.env.VITE_BACKEND_URL + "/api/order/"+orderId,{
            status : status
        },{
            headers : {
                Authorization : "Bearer "+token
            }
        }).then(
            () => {
                toast.success("Order Status changed successfully")
                setLoaded(false)
            }
        ).catch(
            (err) => {
                toast.error("Order status not changed")
                console.log(err)
            }
        )
    }

    return(
        <div className="w-full h-full rounded-lg relative pt-2 overflow-auto">
            {
                loaded? (
                
                <div className="w-full h-full">
                    <table className="w-full">
                        <thead className="text-gray-300 ">
                            <tr>
                                <th>Order ID</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) => {
                                    return(
                                        <tr 
                                        key={index}
                                        className="w-full h-[60px] text-center text-gray-400 border-b-1 border-gray-300 cursor-pointer hover:bg-gray-600 "
                                        >
                                            <td className="p-2">{order.orderId}</td>
                                            <td className="p-2">{order.email}</td>
                                            <td className="p-2">{order.name}</td>
                                            <td className="p-2">{order.address}</td>
                                            <td className="p-2">{order.phoneNumber}</td>
                                            <td className="p-2">
                                                <select 
                                                value={order.status}
                                                onChange={(e) => {
                                                    changeOrderStatus(order.orderId, e.target.value)
                                                }}
                                                >
                                                    <option value={"Pending"}>Pending</option>
                                                    <option value={"Delivered"}>Delivered</option>
                                                    <option value={"Cancelled"}>Cancelled</option>
                                                    <option value={"Processing"}>Processing</option>
                                                </select>
                                            </td>
                                            <td className="p-2">LKR {order.total.toFixed(2)}</td>
                                            <td className="p-2">{new Date(order.date).toDateString()}</td>
                                            <td className="p-2">
                                                <button
                                                className="bg-gray-700 hover:bg-gray-500 text-white p-2 rounded-lg cursor-pointer "
                                                onClick={() => {
                                                    setModelDisplaying(true)
                                                    setDisplayingOrder(order)
                                                }}
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {
                        modelDisplaying && 
                        <div
                            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm
                            flex justify-center items-center p-3 sm:p-6"
                            onClick={() => setModelDisplaying(false)}
                        >
                            <div
                                className="relative w-full max-w-2xl max-h-[90vh]
                                bg-gradient-to-br from-[#211010] via-[#160909] to-[#0d0707]
                                border border-red-900/40 rounded-2xl sm:rounded-3xl
                                shadow-[0_0_50px_rgba(220,38,38,0.15)]
                                overflow-hidden flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                            
                                {/* Header */}
                                <div className="relative p-5 sm:p-7
                                    border-b border-red-900/30
                                    bg-gradient-to-r from-red-950/50 to-transparent">
                                    
                                    <button
                                        onClick={() => setModelDisplaying(false)}
                                        className="absolute top-4 right-4 w-9 h-9
                                        flex items-center justify-center rounded-full
                                        bg-white/5 border border-white/10
                                        text-gray-400 hover:text-white
                                        hover:bg-red-700 hover:border-red-500
                                        transition-all duration-300 cursor-pointer"
                                    >
                                        <IoCloseSharp size={22} />
                                    </button>

                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-11 h-11 rounded-xl
                                            bg-red-600/15 border border-red-600/30
                                            flex items-center justify-center">
                                            <span className="text-red-500 text-xl">📦</span>
                                        </div>

                                        <div>
                                            <h2 className="text-xl sm:text-2xl
                                                font-black text-white tracking-wide">
                                                Order Details
                                            </h2>
                                            <p className="text-xs text-gray-500 mt-1">
                                                B.STORE Purchase Information
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <p className="text-xs text-gray-500 uppercase
                                            tracking-widest mb-1">
                                            Order Reference
                                        </p>
                                        <p className="text-sm sm:text-base font-bold
                                            text-red-400 break-all">
                                            {displayinfOrder.orderId}
                                        </p>
                                    </div>
                                </div>

                                {/* Order Information */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6">

                                    <div className="bg-white/[0.04] border border-white/10
                                        rounded-xl p-3">
                                        <p className="text-[10px] sm:text-xs
                                            text-gray-500 mb-2 uppercase tracking-wider">
                                            Order Date
                                        </p>
                                        <p className="text-xs sm:text-sm font-semibold text-white">
                                            {new Date(displayinfOrder.date).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="bg-white/[0.04] border border-white/10
                                        rounded-xl p-3">
                                        <p className="text-[10px] sm:text-xs
                                            text-gray-500 mb-2 uppercase tracking-wider">
                                            Total Amount
                                        </p>
                                        <p className="text-xs sm:text-sm font-bold text-red-400">
                                            LKR {Number(displayinfOrder.total).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="bg-white/[0.04] border border-white/10
                                        rounded-xl p-3 col-span-2 sm:col-span-2">
                                        <p className="text-[10px] sm:text-xs
                                            text-gray-500 mb-2 uppercase tracking-wider">
                                            Order Status
                                        </p>

                                        <span className="inline-flex items-center gap-2
                                            px-3 py-1 rounded-full text-xs font-bold
                                            bg-red-500/10 border border-red-500/20
                                            text-red-400">
                                            <span className="w-1.5 h-1.5 rounded-full
                                                bg-red-500" />
                                            {displayinfOrder.status}
                                        </span>
                                    </div>

                                </div>

                                {/* Items Header */}
                                <div className="px-5 sm:px-6 pb-3 flex items-center
                                    justify-between border-b border-white/10">
                                    <h3 className="text-sm sm:text-base
                                        font-bold text-white">
                                        Ordered Products
                                    </h3>

                                    <span className="text-xs text-gray-500">
                                        {displayinfOrder.billItems.length} Items
                                    </span>
                                </div>

                                {/* Product List */}
                                <div className="flex-1 min-h-0 overflow-y-auto
                                    px-4 sm:px-6 py-4 space-y-3
                                    scrollbar-thin scrollbar-thumb-red-900
                                    scrollbar-track-transparent">
                                    
                                    {displayinfOrder.billItems.map((item, indx) => (
                                        <div
                                            key={indx}
                                            className="flex items-center gap-3 sm:gap-5
                                            p-3 rounded-2xl
                                            bg-white/[0.04] border border-white/[0.08]
                                            hover:border-red-900/50
                                            hover:bg-red-950/20 transition-all duration-300"
                                        >
                                        
                                            {/* Product Image */}
                                            <div className="w-20 h-20 sm:w-24 sm:h-24
                                                shrink-0 overflow-hidden rounded-xl
                                                bg-black/30 border border-white/10">
                                                <img
                                                    src={item.image}
                                                    alt={item.productName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                    
                                            {/* Product Information */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm sm:text-base
                                                    font-bold text-white truncate">
                                                    {item.productName}
                                                </h4>
                                    
                                                <p className="text-xs text-gray-500 mt-2">
                                                    Unit Price
                                                </p>
                                    
                                                <p className="text-sm font-semibold text-red-400">
                                                    LKR {Number(item.price).toFixed(2)}
                                                </p>
                                    
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                    
                                            {/* Item Total */}
                                            <div className="text-right shrink-0">
                                                <p className="text-[10px] sm:text-xs
                                                    text-gray-500 mb-1">
                                                    Subtotal
                                                </p>
                                                <p className="text-xs sm:text-sm
                                                    font-bold text-white">
                                                    LKR {(Number(item.price) *
                                                        Number(item.quantity)).toFixed(2)}
                                                </p>
                                            </div>
                                                    
                                        </div>
                                    ))}

                                </div>
                                
                                {/* Footer */}
                                <div className="p-5 sm:px-7 sm:py-5
                                    border-t border-red-900/30
                                    bg-black/20 flex items-center justify-between">
                                    
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Total Order Value
                                        </p>
                                        <h3 className="text-lg sm:text-2xl
                                            font-black text-red-500 mt-1">
                                            LKR {Number(displayinfOrder.total).toFixed(2)}
                                        </h3>
                                    </div>
                                
                                    <button
                                        onClick={() => setModelDisplaying(false)}
                                        className="px-5 sm:px-7 py-3 rounded-xl
                                        bg-gradient-to-r from-red-800 to-red-600
                                        hover:from-red-700 hover:to-red-500
                                        text-white text-xs sm:text-sm font-bold
                                        shadow-lg shadow-red-900/20
                                        transition-all duration-300 cursor-pointer"
                                    >
                                        Close
                                    </button>
                                
                                </div>
                                
                            </div>
                        </div>
                        
                    }
                </div>
                ) : (
                <div className="w-full h-full">
                    <Loader/>
                </div>
                )
            } 
        </div>
    )
}