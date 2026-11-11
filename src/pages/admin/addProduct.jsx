import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import MediaUpload from "../../../utils/mediaUpload";

export default function AddProductForm() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [price, setPrice] = useState("");
  const [labeledPrice, setLabeledPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(){

    const promisesArray = []

    for (let i=0; i<images.length; i++) {
      const promise = MediaUpload(images[i]);
      promisesArray[i] = promise
    }
    try{
    const result = await Promise.all(promisesArray)

    const imageUrl = result.map(
      (item) => {
        return item.data.publicUrl;
      }
    )

    const altNamesArray = altNames.split(",")

    const product = {
      productId : productId,
      productName : productName,
      altNames : altNamesArray,
      price : price,
      labeledPrice : labeledPrice,
      description : description,
      stock : stock,
      images : imageUrl
    }
    const token = localStorage.getItem("token")

    await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/product", product, {
      headers : {
        "Authorization" : "Bearer "+token
      }
    })
    toast.success("Product added successfully")
    navigate("/admin/products")
  }catch (error) {
    toast.error("Product adding failed");
    console.log(error)
  }
    
  }
  return (
    <div className="w-full h-full rounded-lg flex justify-center items-center overflow-auto">
      <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center ">
        <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Add Product</h1>
        <input
          value={productId}
          onChange={(e)=> {setProductId(e.target.value)}}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product ID"
        />

        <input
          value={productName}
          onChange={(e)=> {setProductName(e.target.value)}}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Product Name"
        />

        <input
          value={altNames}
          onChange={(e) => {setAltNames(e.target.value)}}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Alternative Name"
        />

        <input
          value={price}
          type="number"
          onChange={(e) => {setPrice(e.target.value)}}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Price"
        />

        <input
          value={labeledPrice}
          type="number"
          onChange={(e)=> {setLabeledPrice(e.target.value)}}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Labelled Price"
        />

        <textarea
          value={description}
          onChange={(e) => {setDescription(e.target.value)}}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Description"
        />

         <input
          type="file"
          onChange={(e) => {setImages(e.target.files)}}
          multiple
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
        />

        <input
          value={stock}
          type="number"
          onChange={(e) => {setStock(e.target.value)}}
          className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]"
          placeholder="Stock"
        />

        <div className="w-[400px] h-[100px] flex items-center justify-between">
            <Link 
            to={"/admin/products"}
            className="w-[180px] bg-red-500 text-white text-center p-[10px] hover:bg-red-600 rounded-lg" >Cancel</Link>

            <button onClick={handleSubmit} className="w-[180px] bg-green-500 text-white text-center p-[10px] hover:bg-green-600 rounded-lg cursor-pointer">Submit</button>
        </div>
      </div>
    </div>
  );
}
