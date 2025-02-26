import React, { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { useProductContext } from "@/contexts/ProductContext";
import SingleProductCard from "./SingleProductCard";

function SingleProduct() {
  const { getProductById } = useProductContext();
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setSingleProduct(response);
      } catch (error) {
        console.error("Error fetching single product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!singleProduct) {
    return <p>Loading product...</p>;
  }

  return (
    <>
     <div className="flex justify-center items-center min-h-screen">
    <SingleProductCard product={singleProduct} />
  </div>
    </>
  );
}

export default SingleProduct;
