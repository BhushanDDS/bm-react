import React, { useState } from 'react'
import {useProductContext} from '../../contexts/ProductContext'

type ratings={
    rating:number;
}
type Product={
    title:string ;
    price :number;
    description:string;
    image :string;
    category :string;
    ratings?:ratings

}
function PostForm() {

    const {postProductt}=useProductContext()
    const [data, setdata] = useState<Product>({
        title: "",
        price: 0,
        description: "",
        image: "",
        category: "",
      });
      const subitHandler = async (e: React.FormEvent) => {
        e.preventDefault(); 
      
        try {
          const response: any = await postProductt(data);
          if (response === 201 || response === 200) {
            alert(`Product Posted Successfully! Status code: ${response}`);
            setdata({ title: "", price: 0, description: "", image: "", category: "" });
          }
        } catch (error) {
          console.error("Error submitting product:", error);
        }
      };
      
      return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
          
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Add Product
          </h2>
      
          <form className="space-y-4" onSubmit={subitHandler}>
            
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Enter Title
              </label>
              <input 
                type="text" id="title" value={data?.title} 
                onChange={(e) => setdata({ ...data, title: e.target.value })}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Enter Price
              </label>
              <input 
                type="number" id="price" value={data?.price} 
                onChange={(e) => setdata({ ...data, price: Number(e.target.value) })}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Enter Description
              </label>
              <textarea 
                id="description" value={data?.description} 
                onChange={(e) => setdata({ ...data, description: e.target.value })}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Image */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Enter Image URL
              </label>
              <input 
                type="text" id="image" value={data?.image} 
                onChange={(e) => setdata({ ...data, image: e.target.value })}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Enter Category
              </label>
              <input 
                type="text" id="category" value={data?.category} 
                onChange={(e) => setdata({ ...data, category: e.target.value })}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              Submit
            </button>
      
          </form>
        </div>
      );
      
}

export default PostForm