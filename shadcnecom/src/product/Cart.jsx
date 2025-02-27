import React from "react";
import { useProductContext } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function Cart() {
  const { cart, removeFromCart } = useProductContext();

  // Calculate total cart value
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
      
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <Card key={item.productId} className="flex items-center p-4 shadow-md border">
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 object-contain rounded-lg"
              />
              <CardContent className="flex-1 ml-4">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-gray-600">${item.price} x {item.quantity}</p>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" onClick={() => removeFromCart(item.productId)}>
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {/* Total Price Section */}
          <Separator className="my-4" />
          <div className="flex justify-between items-center p-4 text-lg font-semibold">
            <span>Total:</span>
            <span className="text-green-600">${totalPrice}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
