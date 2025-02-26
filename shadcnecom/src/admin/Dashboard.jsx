import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import AdminProductCard from "./AdminProductCard";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate= useNavigate()
  const { getAllProducts, products } = useProductContext();
  const [limit, setLimit] = useState(""); 

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleFetchLimitedProducts = () => {
    const limitNumber = parseInt(limit, 10);
    if (!isNaN(limitNumber) && limitNumber > 0) {
      getAllProducts(limitNumber);
    }
  };

  const handleUpdate = (product) => {
    navigate(`/update-product/${product.id}`)
  };

return (

    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Admin Dashboard</h1>

      <nav className="flex justify-center space-x-6 bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <Link to="/post-product" className="text-white text-lg hover:text-gray-300 transition">
        Post Product
      </Link>
      <Link to="/" className="text-white text-lg hover:text-red-400 transition">
        Logout
      </Link>
    </nav>

      <div className="flex justify-center items-center gap-3 mb-6">
        <input
          type="number"
          max={20}
          min={1}
          placeholder="Enter limit"
          value={limit}
          onChange={handleLimitChange}
          className="w-40"
        />
        <Button onClick={handleFetchLimitedProducts} className="bg-blue-500 text-white">
          Fetch
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-center">Loading products...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
