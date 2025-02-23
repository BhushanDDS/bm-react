import React,{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../contexts/ProductContext';
import {useNavigate} from 'react-router-dom'
type Product = {

  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
 
};
function SingleProduct() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const { getproduct } = useProductContext();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response:any = await getproduct(id);
                setProduct(response);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 border border-gray-200">
          
          {/* Product Image */}
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-64 object-contain p-4"
          />
      
          {/* Product Details */}
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-lg font-semibold text-blue-600 mt-4">Price: ${product.price}</p>
      
            {/* Back Button */}
            <button 
              onClick={() => navigate('/')} 
              className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
            >
              Go back to Homepage
            </button>
          </div>
          
        </div>
      );
      
}

export default SingleProduct;
