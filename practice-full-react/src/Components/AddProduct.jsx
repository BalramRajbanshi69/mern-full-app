
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddProduct = () => {

   const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    inStock: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    console.log("add product");
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("inStock", product.inStock);
    if (product.image) {
      formData.append("myfile", product.image);
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/product/addproduct",
        formData,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      toast.success("Product added successfully!");

      setProduct({
        name: "",
        description: "",
        price: "",
        inStock: "",
        image: "",
      });

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
      console.error(error);
    }
  };
  const handleChange = (e) => {
    // console.log("handle change");
    if (e.target.type == "file") {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
      console.log(e.target.files[0]);
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="min-h-screen p-4 bg-[#0a0908]">
      <div className="max-w-3xl p-8 mx-auto rounded-4xl shadow-lg bg-[#132a13]">
        <div className="mb-8 text-white">
          <h2 className="text-3xl font-bold ">Add New Products</h2>
          <div className="h-1 mt-2 bg-blue-600 w-65"></div>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6 text-white"
        >
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="block w-full p-2 mt-1 text-white placeholder-gray-400 bg-transparent border border-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter product title"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="block w-full p-2 mt-1 text-white placeholder-gray-400 bg-transparent border border-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          {/* Price and Stock Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-white">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="block w-full p-2 mt-1 placeholder-gray-400 bg-transparent border border-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Stock Quantity
              </label>
              <input
                type="number"
                name="inStock"
                value={product.inStock}
                onChange={handleChange}
                className="block w-full p-2 mt-1 placeholder-gray-400 bg-transparent border border-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-white">
              Product Image
            </label>
            <div className="flex justify-center px-6 pt-5 pb-6 mt-1 transition-colors border-2 border-white border-dashed rounded-md hover:border-blue-500">
              <div className="space-y-1 text-center">
                <FaCloudUploadAlt className="w-12 h-12 mx-auto text-gray-400" />
                <div className="flex text-sm text-white">
                  <label
                    htmlFor="image"
                    className="relative font-medium text-blue-400 bg-white rounded-md cursor-pointer hover:text-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      multiple
                      onChange={handleChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1 ">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-300">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md shadow-sm cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Products
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;