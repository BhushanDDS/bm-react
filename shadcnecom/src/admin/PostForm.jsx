import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProductContext } from "@/contexts/ProductContext";
import { Link } from "react-router-dom";

function PostForm() {
  const { addProductt } = useProductContext();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addProductt(product);
      if (res === 200 || res === 201) {
        alert("Product added successfully!");
        setProduct({ title: "", price: "", description: "", category: "", image: "" });
      }
    } catch (error) {
      console.error("Error posting product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add a New Product</h2>

      <nav className="flex justify-center space-x-6 bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <Link to="/dashboard" className="text-white text-lg hover:text-gray-300 transition">
Go to Dashboard       </Link>
      <Link to="/" className="text-white text-lg hover:text-red-400 transition">
        Logout
      </Link>
    </nav>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Product Title"
          required
        />
        <Input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <Textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
        />
        <Input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <Input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />

        <Button type="submit" className="w-full bg-blue-500">
          Post Product
        </Button>
      </form>
    </div>
  );
}

export default PostForm;
