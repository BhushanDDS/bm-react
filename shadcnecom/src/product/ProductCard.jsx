import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
function ProductCard({ product }) {

    const navigate=useNavigate()
    const handleSingleProduct=()=>{
    navigate(`/get-single-product/${product.id}`)
    }
  return (
    <Card className="w-80 p-4 shadow-md rounded-xl border">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-contain mb-3 rounded-lg"
      />
      <CardContent>
        <h2 className="text-lg font-semibold line-clamp-2">{product.title}</h2>
        <p className="text-gray-600 mt-1">${product.price}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-2" onClick={handleSingleProduct}>View Details</Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
