import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductContext } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

function UpdateProduct() {
  const { id } = useParams();
  const { updateProduct, getProductById } = useProductContext();

  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setCurrentProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, getProductById]);

  const handleChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProduct(id, currentProduct);
    if (res === 200) {
      alert("Product updated successfully!");
    }
  };

  return (

    <>
    
    <nav className="flex justify-center space-x-6 bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <Link to="/dashboard" className="text-white text-lg hover:text-gray-300 transition">
      Go to Dashboard
      </Link>
      <Link to="/" className="text-white text-lg hover:text-red-400 transition">
        Logout
      </Link>
    </nav>
    
    
    <Card className="max-w-md mx-auto mt-10 p-6 shadow-lg">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={currentProduct.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              name="price"
              value={currentProduct.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={currentProduct.description}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full">
            Update Product
          </Button>
        </form>
      </CardContent>
    </Card>

    </>
  );
}

export default UpdateProduct;
