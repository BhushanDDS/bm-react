/*
import React, { useEffect } from 'react';
import { useProductContext } from '../contexts/ProductContext';

function Cart() {
    const { cart, getCart, removeFromCart } = useProductContext();

    // useEffect(() => {
    //     getCart();
    // }, []);

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 mt-6">
          
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Shopping Cart</h2>
      
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
                >
                  <div>
                  <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-64 object-contain p-4"
          />                    <p className="text-lg font-medium text-gray-700">Product ID: {item.id}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
      
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
      
}

export default Cart;

*/

import React from 'react';
import { useProductContext } from '../contexts/ProductContext';

function Cart() {
    const { cart, getCart, removeFromCart, updateCartQuantity } = useProductContext();

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200 mt-6">
          
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Shopping Cart</h2>
      
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-gray-100 p-4 rounded-lg gap-4"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 object-contain rounded-lg"
                  />

                  <div className="flex-1">
                    {item.title}
                    <p className="text-lg font-medium text-gray-700">{item.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        className="px-2 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                        <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
}

export default Cart;
