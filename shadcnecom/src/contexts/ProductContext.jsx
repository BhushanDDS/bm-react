import React,{useContext,createContext,useState} from 'react'
import axios from 'axios'

const ProductContext= createContext()


export const UserContextProvider = ({children}) => {
    const [products, setProducts] =useState([])
    const [categories, setcategories] = useState(["hi","hello"])

    const getAllProducts =async(limit=20)=>{
        try {
            const response = await axios.get(`https://fakestoreapi.com/products?limit=${limit}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const getProductById=async(id)=>{
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    const getAllCategories=async()=>{
        try {
            const response = await axios.get('https://fakestoreapi.com/products/categories');
            setcategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    const getProductsByCategory=async(category)=>{
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching category products:', error);
        }

    }

    const sortAsc = () => {
        setProducts([...products].sort((a, b) => a.price - b.price));
    };

    const sortDsc = () => {
        setProducts([...products].sort((a, b) => b.price - a.price));
    };


    const addProductt=async(product)=>{
        try {
            const response = await axios.post(
              "https://fakestoreapi.com/products",
              JSON.stringify(product), 
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            return response.status
          } catch (error) {
            throw new Error("Error in posting product");
          }
    }

    const updateProduct=async(id,product)=>{
        try {
            const response = await axios.patch(
              `https://fakestoreapi.com/products/${id}`, 
             product, 
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

    const deleteProduct=async(id)=>{
        const response= await axios.delete(`https://fakestoreapi.com/products/${id}`);
        if(!response){
          throw new Error("in delete ");  
        }
        if(response===200){
            alert('product deleted')
        }
        return response.status
    }

    return(
        <ProductContext.Provider value={{
            products,
            categories,
            addProductt,
            updateProduct,
            deleteProduct,
            getAllCategories,
            getAllProducts,
            getProductById,
            getProductsByCategory,
            sortAsc,
            sortDsc}}>
        {children}
        </ProductContext.Provider>
    )
}



export function useProductContext(){
    return useContext(ProductContext);
}

