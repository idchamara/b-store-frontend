import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

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
                        <div className="fixed bg-[#00000070] w-full h-full top-0 left-0 flex justify-center items-center">
                            <div className="w-[600px] h-[600px] max-h-[600px] bg-white  relative">
                                <button 
                                className="w-[30px] h-[30px] rounded-full border-2 border-red-500 flex justify-center items-center cursor-pointer absolute right-[-35px] top-[-35px]"
                                onClick={() => {setModelDisplaying(false)}}
                                >
                                    <IoCloseSharp className="text-xl text-red-500"/>
                                </button>
                                <div className="w-[full] h-[150px]">
                                    <h1 className="text-sm font-bold p-2">Order ID: {displayinfOrder.orderId}</h1>
                                    <h1 className="text-sm font-bold p-2">Order Date: {new Date(displayinfOrder.date).toDateString()}</h1>
                                    <h1 className="text-sm font-bold p-2">Total: LKR {displayinfOrder.total.toFixed(2)}</h1>
                                    <h1 className="text-sm font-bold p-2">Status: {displayinfOrder.status}</h1>
                                    
                                </div>
                                <div className="w-[full] h-[450px] max-h-[450px] overflow-y-scroll">
                                    {
                                        displayinfOrder.billItems.map((item, indx) => {
                                            return(
                                                <div 
                                                key={indx}
                                                className="w-full h-[100px] shadow-2xl bg-white my-[5px] flex justify-between items-center"
                                                >
                                                    <img src={item.image} className="h-full aspect-square object-cover" />
                                                    <div className="h-full w-[300px] max-w-[300px] overflow-hidden">
                                                        <h1>{item.productName}</h1>
                                                        <h1>LKR {item.price.toFixed(2)}</h1>
                                                        <h1>Quantity: {item.quantity}</h1>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
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