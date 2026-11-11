import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MediaUpload from "../../../utils/mediaUpload";

export default function EditProductForm() {
  const locationData = useLocation();
  const navigate = useNavigate();

  if (locationData.state == null) {
    toast.error("Please select a product to edit");
    window.location.href = "/admin/products";
  }

  const [productId, setProductId] = useState(locationData.state.productId);
  const [productName, setProductName] = useState(
    locationData.state.productName,
  );
  const [altNames, setAltNames] = useState(
    locationData.state.altNames.join(", "),
  );
  const [price, setPrice] = useState(locationData.state.price);
  const [labeledPrice, setLabeledPrice] = useState(
    locationData.state.labeledPrice,
  );
  const [description, setDescription] = useState(
    locationData.state.description,
  );
  const [stock, setStock] = useState(locationData.state.stock);
  const [images, setImages] = useState([]);

  async function handleSubmit() {
    const promisesArray = [];

    for (let i = 0; i < images.length; i++) {
      const promise = MediaUpload(images[i]);
      promisesArray[i] = promise;
    }
    try {
      let result = await Promise.all(promisesArray);
      
      // changed point
      if (images.length > 0) {
        result = result.map((item) => item.data.publicUrl);
      } else {
        result = locationData.state.images;
      }

      const altNamesArray = altNames.split(",");

      const product = {
        productName: productName,
        altNames: altNamesArray,
        price: price,
        labeledPrice: labeledPrice,
        description: description,
        stock: stock,
        images: result,
      };
      const token = localStorage.getItem("token");

      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId,
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Product updating failed");
      console.log(error);
    }
  }
  return (
    <div className="w-full h-full rounded-lg flex justify-center items-center overflow-auto">
      <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center ">
        <h1 className="text-3xl font-bold text-gray-700 m-[10px]">
          Update Product
        </h1>
        <input
          disabled
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product ID"
        />

        <input
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product Name"
        />

        <input
          value={altNames}
          onChange={(e) => {
            setAltNames(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Alternative Name"
        />

        <input
          value={price}
          type="number"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Price"
        />

        <input
          value={labeledPrice}
          type="number"
          onChange={(e) => {
            setLabeledPrice(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Labelled Price"
        />

        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Description"
        />

        <input
          type="file"
          onChange={(e) => {
            setImages(e.target.files);
          }}
          multiple
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
        />

        <input
          value={stock}
          type="number"
          onChange={(e) => {
            setStock(e.target.value);
          }}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Stock"
        />

        <div className="w-[400px] h-[100px] flex items-center justify-between">
          <Link
            to={"/admin/products"}
            className="w-[180px] bg-red-500 text-white text-center p-[10px] hover:bg-red-600 rounded-lg"
          >
            Cancel
          </Link>

          <button
            onClick={handleSubmit}
            className="w-[180px] bg-green-500 text-white text-center p-[10px] hover:bg-green-600 rounded-lg cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
