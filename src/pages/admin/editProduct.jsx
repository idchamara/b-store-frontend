
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBox,
  FaCloudUploadAlt,
  FaImage,
  FaTrash,
  FaTag,
  FaDollarSign,
  FaWarehouse,
} from "react-icons/fa";
import MediaUpload from "../../../utils/mediaUpload";

export default function EditProductForm() {
  const locationData = useLocation();
  const navigate = useNavigate();

  const selectedProduct = locationData.state;

  const [productId, setProductId] = useState(
    selectedProduct?.productId || ""
  );
  const [productName, setProductName] = useState(
    selectedProduct?.productName || ""
  );
  const [altNames, setAltNames] = useState(
    selectedProduct?.altNames?.join(", ") || ""
  );
  const [price, setPrice] = useState(selectedProduct?.price || "");
  const [labeledPrice, setLabeledPrice] = useState(
    selectedProduct?.labeledPrice || ""
  );
  const [description, setDescription] = useState(
    selectedProduct?.description || ""
  );
  const [stock, setStock] = useState(selectedProduct?.stock || "");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Redirect if no product was selected
  useEffect(() => {
    if (!selectedProduct) {
      toast.error("Please select a product to edit");
      navigate("/admin/products", { replace: true });
    }
  }, [selectedProduct, navigate]);

  if (!selectedProduct) {
    return null;
  }

  function handleImageChange(e) {
    setImages(Array.from(e.target.files || []));
  }

  function removeSelectedImage(index) {
    setImages((previousImages) =>
      previousImages.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !productName.trim() ||
      !price ||
      !labeledPrice ||
      !description.trim() ||
      stock === ""
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (
      Number(price) < 0 ||
      Number(labeledPrice) < 0 ||
      Number(stock) < 0
    ) {
      toast.error("Values cannot be negative");
      return;
    }

    setLoading(true);

    try {
      let updatedImages = selectedProduct.images || [];

      // Upload new images only if the user selected them
      if (images.length > 0) {
        const uploadResults = await Promise.all(
          images.map((image) => MediaUpload(image))
        );

        updatedImages = uploadResults.map(
          (item) => item.data.publicUrl
        );
      }

      const product = {
        productName: productName.trim(),
        altNames: altNames
          .split(",")
          .map((name) => name.trim())
          .filter(Boolean),
        price: Number(price),
        labeledPrice: Number(labeledPrice),
        description: description.trim(),
        stock: Number(stock),
        images: updatedImages,
      };

      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`,
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("Product update error:", error);
      toast.error(
        error.response?.data?.message || "Product updating failed"
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle =
    "form-input w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500";

  return (
    <div className="w-full h-full overflow-y-auto bg-[#160909] text-white p-4 md:p-8">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition mb-3"
          >
            <FaArrowLeft />
            Back to Products
          </Link>

          <h1 className="text-3xl font-bold">
            Edit <span className="text-red-500">Product</span>
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Update your product information and inventory details.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
          <FaBox className="text-red-400 text-xl" />
          <div>
            <p className="text-xs text-gray-400">Product ID</p>
            <p className="text-sm font-semibold">{productId}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto rounded-2xl border border-red-500/20 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden"
      >
        <div className="p-5 md:p-8 space-y-8">

          {/* Basic Information */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                <FaTag className="text-red-400" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Basic Information</h2>
                <p className="text-xs text-gray-500">
                  Product name and description
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Product ID
                </label>
                <input
                  disabled
                  value={productId}
                  className={`${inputStyle} opacity-50 cursor-not-allowed`}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Product Name *
                </label>
                <input
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className={inputStyle}
                  placeholder="Enter product name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-2">
                  Alternative Names
                </label>
                <input
                  value={altNames}
                  onChange={(e) => setAltNames(e.target.value)}
                  className={inputStyle}
                  placeholder="Name 1, Name 2, Name 3"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Separate alternative names using commas.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputStyle} resize-none`}
                  placeholder="Enter product description..."
                />
              </div>
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* Pricing and Stock */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                <FaDollarSign className="text-red-400" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">
                  Pricing & Inventory
                </h2>
                <p className="text-xs text-gray-500">
                  Update prices and available stock
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Selling Price *
                </label>
                <input
                  required
                  min="0"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={inputStyle}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Labelled Price *
                </label>
                <input
                  required
                  min="0"
                  type="number"
                  value={labeledPrice}
                  onChange={(e) => setLabeledPrice(e.target.value)}
                  className={inputStyle}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Available Stock *
                </label>
                <div className="relative">
                  <FaWarehouse className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    required
                    min="0"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className={`${inputStyle} pl-11`}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-white/10" />

          {/* Images */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
                <FaImage className="text-red-400" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Product Images</h2>
                <p className="text-xs text-gray-500">
                  Upload new images to replace the existing images
                </p>
              </div>
            </div>

            {/* Existing images */}
            <p className="text-sm text-gray-300 mb-3">
              Current Images
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
              {(selectedProduct.images || []).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/30"
                >
                  <img
                    src={image}
                    alt={`Current product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 text-xs bg-black/70 px-2 py-1 rounded-md">
                    Current
                  </span>
                </div>
              ))}
            </div>

            {/* Upload new images */}
            <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-red-500/30 hover:border-red-500/70 rounded-2xl bg-red-500/[0.04] cursor-pointer transition">
              <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center">
                <FaCloudUploadAlt className="text-3xl text-red-400" />
              </div>

              <div className="text-center">
                <p className="font-semibold text-gray-200">
                  Click to upload new images
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG or WEBP
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* New image previews */}
            {images.length > 0 && (
              <div className="mt-5">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-gray-300">
                    New Images ({images.length})
                  </p>
                  <button
                    type="button"
                    onClick={() => setImages([])}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Clear all
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="relative aspect-square rounded-xl overflow-hidden border border-red-500/30"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeSelectedImage(index)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/80 text-red-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-amber-400 mt-3">
                  Uploading new images will replace all current product images.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 p-5 md:px-8 border-t border-white/10 bg-black/20">
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
            {loading ? "Updating..." : "Update Product →"}
          </button>
        </div>
      </form>

      <style>{`
        .form-input:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.10);
        }
        .form-input:disabled {
          -webkit-text-fill-color: #9ca3af;
        }
      `}</style>
    </div>
  );
}
