import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {
  const [prodcts, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
  }, []);

  return (
    <div className="w-full h-full rounded-lg relative">
        <Link 
        to={"/admin/addProduct"}
        className="absolute right-5 bottom-5 text-white bg-gray-700 p-3 text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700">
            <FaPlus />
        </Link>
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2">Product ID</th>
            <th className="p-2">Product Name</th>
            <th className="p-2">Product Price</th>
            <th className="p-2">Labeled Price</th>
            <th className="p-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {prodcts.map((prodcts, indexNumber) => {
            console.log("Mapping " + prodcts.productId);

            return (
              <tr key={indexNumber} className="w-full h-[60px] text-center border-b-2 border-gray-300 cursor-pointer hover:bg-gray-500 hover:text-white">
                <td className="p-2">{prodcts.productId}</td>
                <td className="p-2">{prodcts.productName}</td>
                <td className="p-2">{prodcts.price}</td>
                <td className="p-2">{prodcts.labeledPrice}</td>
                <td className="p-2">{prodcts.stock}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
