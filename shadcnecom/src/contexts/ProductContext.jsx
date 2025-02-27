import React,{useContext,createContext,useState} from 'react'
import axios from 'axios'

const ProductContext= createContext()


export const UserContextProvider = ({children}) => {
    const [products, setProducts] =useState([])
    const [categories, setcategories] = useState(["hi","hello"])
    const [cart, setCart] = useState([])

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


    const addToCart = async (productId, quantity) => {
        try {
          const productResponse = await axios.get(`https://fakestoreapi.com/products/${productId}`);
          const product = productResponse.data;
      
          const existingItem = cart.find(item => item.productId === productId);
          let updatedCart;
      
          if (existingItem) {
            updatedCart = cart.map(item =>
              item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
            );
          } else {
            updatedCart = [...cart, { productId, quantity, title: product.title, price: product.price, image: product.image }];
          }
      
          await axios.post(`https://fakestoreapi.com/carts`, {
            userId: 1,
            date: new Date().toISOString(),
            products: updatedCart.map(item => ({ productId: item.productId, quantity: item.quantity })),
          });
      
          setCart(updatedCart);
        } catch (error) {
          console.error('Error adding to cart:', error);
        }
      };
      

      const removeFromCart = async (productId) => {
        try {
          const response = await axios.delete(`https://fakestoreapi.com/carts/${productId}`); 
          if (response.status === 200) {
            const updatedCart = cart.filter(item => item.productId !== productId);
            setCart(updatedCart);
          }
        } catch (error) {
          console.error('Error removing from cart:', error);
        }
      };
      

    return(
        <ProductContext.Provider value={{
            products,
            categories,
            cart,
            addToCart,
            removeFromCart,
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

