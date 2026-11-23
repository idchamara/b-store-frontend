
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";
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

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleImageChange(e) {
    const selectedImages = Array.from(e.target.files || []);
    setImages(selectedImages);
  }

  function removeImage(index) {
    setImages((previousImages) =>
      previousImages.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !productId.trim() ||
      !productName.trim() ||
      !price ||
      !labeledPrice ||
      !description.trim() ||
      !stock
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (Number(price) < 0 || Number(labeledPrice) < 0 || Number(stock) < 0) {
      toast.error("Values cannot be negative");
      return;
    }

    setLoading(true);

    try {

      // Upload images to Supabase
      const promisesArray = images.map((image) =>
        MediaUpload(image)
      );

      const result = await Promise.all(promisesArray);

      // Extract public image URLs
      const imageUrl = result.map((item) =>
        item.data.publicUrl
      );

      // Convert alternative names to array
      const altNamesArray = altNames
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name !== "");

      const product = {
        productId: productId.trim(),
        productName: productName.trim(),
        altNames: altNamesArray,
        price: Number(price),
        labeledPrice: Number(labeledPrice),
        description: description.trim(),
        stock: Number(stock),
        images: imageUrl
      };

      const token = localStorage.getItem("token");

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/product",
        product,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      toast.success("Product added successfully!");

      navigate("/admin/products");

    } catch (error) {

      console.log("Product adding failed:", error.response?.data || error);

      toast.error(
        error.response?.data?.message || "Product adding failed"
      );

    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="w-full min-h-full bg-[#160909] p-4 md:p-8">

      {/* ================= PAGE HEADER ================= */}

      <div className="max-w-[1000px] mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition mb-3"
            >
              <FaArrowLeft />
              Back to Products
            </Link>

            <h1 className="text-2xl md:text-3xl font-black text-white mt-2">
              Add New Product
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Add a new product to your B Store collection.
            </p>

          </div>

          <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-red-950/40 border border-red-500/30 justify-center items-center text-red-500 text-3xl">
            <MdInventory2 />
          </div>

        </div>


        {/* ================= FORM CARD ================= */}

        <form
          onSubmit={handleSubmit}
          className="bg-red-950/15 backdrop-blur-xl border border-red-500/20 rounded-2xl p-5 md:p-8 shadow-[0_0_30px_rgba(220,38,38,0.08)]"
        >

          {/* BASIC INFORMATION */}

          <div className="mb-8">

            <h2 className="text-white text-lg font-bold">
              Basic Information
            </h2>

            <p className="text-gray-500 text-xs mt-1">
              Enter the main details of your product.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

              {/* Product ID */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Product ID *
                </label>

                <input
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="Enter product ID"
                  className="form-input"
                />
              </div>

              {/* Product Name */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Product Name *
                </label>

                <input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  className="form-input"
                />
              </div>

              {/* Alternative Names */}
              <div className="md:col-span-2">

                <label className="text-gray-300 text-sm mb-2 block">
                  Alternative Names
                </label>

                <input
                  value={altNames}
                  onChange={(e) => setAltNames(e.target.value)}
                  placeholder="Example: Shirt, T-Shirt, Casual Shirt"
                  className="form-input"
                />

                <p className="text-gray-600 text-xs mt-2">
                  Separate multiple names using commas.
                </p>

              </div>

              {/* Description */}
              <div className="md:col-span-2">

                <label className="text-gray-300 text-sm mb-2 block">
                  Product Description *
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your product description..."
                  rows="4"
                  className="form-input resize-none h-auto py-4"
                />

              </div>

            </div>

          </div>


          {/* PRICE & STOCK */}

          <div className="border-t border-red-500/20 pt-7 mb-8">

            <h2 className="text-white text-lg font-bold">
              Pricing & Inventory
            </h2>

            <p className="text-gray-500 text-xs mt-1">
              Configure your product price and available stock.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Selling Price (LKR) *
                </label>

                <input
                  value={price}
                  type="number"
                  min="0"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="form-input"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Labelled Price (LKR) *
                </label>

                <input
                  value={labeledPrice}
                  type="number"
                  min="0"
                  onChange={(e) => setLabeledPrice(e.target.value)}
                  placeholder="0.00"
                  className="form-input"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Available Stock *
                </label>

                <input
                  value={stock}
                  type="number"
                  min="0"
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter quantity"
                  className="form-input"
                />
              </div>

            </div>

          </div>


          {/* PRODUCT IMAGES */}

          <div className="border-t border-red-500/20 pt-7 mb-8">

            <h2 className="text-white text-lg font-bold">
              Product Images
            </h2>

            <p className="text-gray-500 text-xs mt-1">
              Upload one or multiple product images.
            </p>

            <label className="mt-6 w-full min-h-[160px] border-2 border-dashed border-red-500/30 hover:border-red-500 rounded-2xl bg-black/20 flex flex-col justify-center items-center cursor-pointer transition">

              <FaCloudUploadAlt className="text-4xl text-red-500 mb-3" />

              <p className="text-white font-semibold text-sm">
                Click to upload product images
              </p>

              <p className="text-gray-500 text-xs mt-2">
                Select multiple images if required
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />

            </label>


            {/* Image Preview */}

            {images.length > 0 && (

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">

                {images.map((image, index) => (

                  <div
                    key={index}
                    className="relative h-[130px] rounded-xl overflow-hidden border border-red-500/30 group"
                  >

                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-700 hover:bg-red-500 rounded-full flex justify-center items-center text-white"
                    >
                      <FaTimes />
                    </button>

                  </div>

                ))}

              </div>

            )}

            <p className="text-gray-500 text-xs mt-3">
              {images.length} image(s) selected
            </p>

          </div>


          {/* ================= ACTION BUTTONS ================= */}

          <div className="border-t border-red-500/20 pt-7 flex flex-col sm:flex-row justify-end gap-4">

            <Link
              to="/admin/products"
              className="px-8 py-3 border border-red-500/40 hover:bg-red-950/40 rounded-xl text-gray-300 text-center font-semibold transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-10 py-3 bg-red-700 hover:bg-red-600 disabled:bg-gray-700 rounded-xl text-white font-bold shadow-[0_0_20px_rgba(220,38,38,0.3)] transition cursor-pointer"
            >
              {loading ? "Uploading & Saving..." : "Add Product →"}
            </button>

          </div>

        </form>

      </div>

      {/* Input Styles */}
      <style>
        {`
          .form-input {
            width: 100%;
            height: 48px;
            padding: 0 16px;
            background: rgba(0,0,0,0.25);
            border: 1px solid rgba(239,68,68,0.25);
            border-radius: 10px;
            color: white;
            outline: none;
            font-size: 14px;
            transition: all 0.3s ease;
          }

          .form-input::placeholder {
            color: #777;
          }

          .form-input:focus {
            border-color: #dc2626;
            box-shadow: 0 0 0 2px rgba(220,38,38,0.12);
          }
        `}
      </style>

    </div>
  );
}
