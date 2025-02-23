import axios from 'axios';
import React,{createContext , ReactNode, useState,useContext} from 'react'
type Product = {
    id?: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
  };

type ProductContextType={
     product:Product[];
     getProducts:()=>void;
     getproduct:(id:any)=>void;
     updateProduct:(id:any)=>void;
     deleteProduct:(id:any)=>void;
     getCategories:()=>void;
     getProductByCategory:(id:any)=>void;
     postProductt:(data:Product)=>void;
     
   
}

const ProductContext= createContext<ProductContextType |undefined>(undefined);



export const ProductProvider : React.FC<{children:ReactNode}> =({
    children,
}) =>{
    const [product, setProduct] = useState<Product[]>([]);
    
    const getProducts=async()=>{
        const response =await axios.get(`https://fakestoreapi.com/products`);
        if(!response){
            throw new Error("Error while fething all product");
           }
           return response.data;
        
        
    };
    const getproduct= async(id: any)=>{
       const response= await axios.get(`https://fakestoreapi.com/products/${id}`);
       if(!response){
        throw new Error("Error while fething single product");
       }
       return response.data;
    };



    const updateProduct=async(id: any)=>{
      try {
        const response = await axios.patch(
          `https://fakestoreapi.com/products/${id}`, 
          {  
            title: "test product",
            price: 13.5,
            description: "lorem ipsum set",
            image: "https://i.pravatar.cc",
            category: "electronic",
          }, 
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.status;
      } catch (error) {
        throw new Error("Error in updating product");
      }

    }


    const deleteProduct=async(id: any)=>{
      const response= await axios.delete(`https://fakestoreapi.com/products/${id}`);
      if(!response){
        throw new Error("in delete ");
        
      }
      return response.status
    };
    const getCategories=async()=>{
        const response = await axios.get(`https://fakestoreapi.com/products/categories`);
        if(!response){
            throw new Error("Error while fething categories");
           }
           return response.data;
        
    };
    const getProductByCategory=async(id: string)=>{
        const response =await axios.get( `https://fakestoreapi.com/products/category/${id}`)
        if(!response){
            throw new Error("Error while fething products by category ");
           }
           return response.data;
    };

    const postProductt = async (product: any) => {
        try {
          const response = await axios.post(
            "https://fakestoreapi.com/products",
            JSON.stringify(product), // Convert object to JSON string
            {
              headers: {
                "Content-Type": "application/json", // Set JSON format
              },
            }
          );
      
          return response.status;
        } catch (error) {
          console.error("Error posting product:", error);
          throw new Error("Error in posting product");
        }
      };
      

    return (
        <ProductContext.Provider
          value={{
            product,
            getProducts,
            getproduct,
            updateProduct,
            deleteProduct,
            getCategories,
            getProductByCategory,postProductt,
          }}
        >
          {children}
        </ProductContext.Provider>
      );
}


export const useProductContext=():ProductContextType=>{
    const context=useContext(ProductContext);
    if(!context){
        throw new Error("ERR");
    }
    return context;
}

