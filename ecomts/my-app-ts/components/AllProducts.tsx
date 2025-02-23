import React from 'react'
import {useProductContext} from '../contexts/ProductContext'
import {useNavigate} from 'react-router-dom'
type Product = {product:{

    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}
  };

function AllProducts({product}:Product) {
    const navigate=useNavigate();

    const { addToCart } = useProductContext();

    const singleProductHandler = () => {
        navigate(`/getsingleproduct/${product.id}`);
    };

    const addToCartHandler = () => {
        addToCart(product.id, 1);
    };
   return (
  <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 p-6 flex flex-col items-center">
    
    {/* Product Image */}
    <img 
      src={product.image} 
      alt={product.title} 
      className="w-64 h-64 object-contain mb-4"
    />

    {/* Product Details */}
    <div className="text-center w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.title}</h2>
      <p className="text-gray-600 text-lg mb-4">${product.price}</p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button 
          onClick={singleProductHandler} 
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all"
        >
          Get Product
        </button>

        <button 
          onClick={addToCartHandler} 
          className="px-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

      
}

export default AllProducts