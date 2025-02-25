import React, { useEffect, useState } from "react";
import { useProductContext } from "../../contexts/ProductContext";
type Product = {
  id?: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

type AdminProductProps = {
  product: Product;
};

function Admin_Product({ product }: AdminProductProps) {


  const {deleteProduct,updateProduct}=useProductContext();

  const handledelete=async (id:number|undefined)=>{
    
    const resposne:number|any = await deleteProduct(id);
    if(resposne==200){
      alert(`Product deleted succesfully \n status code : ${resposne} `);
    }

  }

  const handleupdate=async(id:number|undefined)=>{
    const response :number |any=await updateProduct(id);
     if(response==200){
      alert(`Product updated succesfully ... \n status code : ${response}`);
    }


  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-4 border border-gray-200">
      
      <img 
        src={product?.image} 
        alt={product?.title} 
        className="w-32 h-32 object-contain mx-auto"
      />
  
      <div className="text-center mt-3">
        <p className="text-lg font-semibold text-gray-800">{product?.title}</p>
        <p className="text-gray-600 text-md font-medium mt-1">Price: ${product?.price}</p>
      </div>
  
      <div className="flex justify-center gap-4 mt-4">
        <button 
          onClick={() => handleupdate(product?.id)} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
        >
          Update
        </button>
  
        <button 
          onClick={() => handledelete(product?.id)} 
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
        >
          Delete
        </button>
      </div>
  
    </div>
  );
  
}

export default Admin_Product;
