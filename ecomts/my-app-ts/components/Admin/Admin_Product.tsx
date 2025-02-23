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

  const handledelete=async (id:number|any)=>{
    
    const resposne:number|any = await deleteProduct(id);
    if(resposne==200){
      alert(`Product deleted succesfully \n status code : ${resposne} `);
    }

  }

  const handleupdate=async(id:any)=>{
    const response :number |any=await updateProduct(id);
     if(response==200){
      alert(`Product updated succesfully ... \n status code : ${response}`);
    }


  }

  return (
    <>
      <img src={product?.image} alt={product?.title} width="100" />
      <p>Title: {product?.title}</p>
      <p>Price: ${product?.price}</p>
      <button onClick={()=>handleupdate(product?.id)} >Update Product</button>
      <button onClick={()=>handledelete(product?.id)}>Delete Product</button>
    </>
  );
}

export default Admin_Product;
