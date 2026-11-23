import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminProductsPage() {
  const [prodcts, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((response) => {
          //console.log(response.data);
          setProducts(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);
  // delete product function========================================================
  async function deleteProduct(id) {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to delete product");
      return;
    }
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/product/" + id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      toast.success("Product delete successfully");
      setLoaded(false);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
      return;
    }
  }

  return (
    <div className="w-full h-full rounded-lg relative overflow-auto">
      <Link
        to={"/admin/addProduct"}
        className="absolute right-5 bottom-5 text-white bg-gray-700 p-3 text-3xl rounded-full cursor-pointer hover:bg-gray-300 hover:text-gray-700"
      >
        <FaPlus />
      </Link>
      {
        // loaded screen
        loaded && (
          <table className="w-full">
            <thead className="text-gray-300 ">
              <tr>
                <th className="p-2">Product ID</th>
                <th className="p-2">Product Name</th>
                <th className="p-2">Product Price</th>
                <th className="p-2">Labeled Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prodcts.map((prodcts, indexNumber) => {
                //console.log("Mapping " + prodcts.productId);

                return (
                  <tr
                    key={indexNumber}
                    className="w-full h-[60px] text-center text-gray-400 border-b-1 border-gray-300 cursor-pointer hover:bg-gray-600 "
                  >
                    <td className="p-2">{prodcts.productId}</td>
                    <td className="p-2">{prodcts.productName}</td>
                    <td className="p-2">{prodcts.price}</td>
                    <td className="p-2">{prodcts.labeledPrice}</td>
                    <td className="p-2">{prodcts.stock}</td>
                    <td className="p-2">
                      <div className="w-full h-fll flex justify-center">
                        <TiPencil
                          className="text-[25px] m-[10px] hover:text-orange-600"
                          onClick={() => {
                            navigate("/admin/editProduct", {
                              state : prodcts
                            });
                          }}
                        />
                        <FaRegTrashAlt
                          className="text-[25px] m-[10px] hover:text-red-700"
                          onClick={() => {
                            deleteProduct(prodcts.productId);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
      }

      {
        // loading screen
        !loaded && <Loader />
      }
    </div>
  );
}
