import React, { use } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function SingleProductCard({ product }) {

    const navigate=useNavigate()
  if (!product) return <p>Loading...</p>;

  return (
    <Card className="w-96 p-4 shadow-lg rounded-xl border text-center">
      <img
        src={product.image}
        alt={product.title}
        className="h-60 w-full object-contain rounded-lg mb-3"
      />
      <CardContent>
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-600 mt-1">${product.price}</p>
        <p className="text-sm text-gray-500 mt-2">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-2">Buy Now</Button>
        <Button className="w-full mt-2" onClick={()=>{
            navigate('/')
        }}>GO Back</Button>
      </CardFooter>
    </Card>
  );
}

export default SingleProductCard;
