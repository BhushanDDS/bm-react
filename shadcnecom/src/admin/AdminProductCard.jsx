import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import HandleDeleteButton from "./HandleDeleteButton";

function AdminProductCard({ product, onUpdate }) {
  return (
    <Card className="w-80 shadow-md border rounded-xl">
      <CardHeader className="flex flex-col items-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-32 w-32 object-contain rounded-md"
        />
        <h2 className="text-lg font-semibold text-center mt-2">{product.title}</h2>
      </CardHeader>
      
      <CardContent className="space-y-2 text-sm text-gray-600">
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p className="truncate"><strong>Description:</strong> {product.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between mt-4">
        <Button onClick={() => onUpdate(product)} className="bg-blue-500 text-white">Update</Button>
        <HandleDeleteButton productId={product.id}  />  
       </CardFooter>
    </Card>
  );
}

export default AdminProductCard;
