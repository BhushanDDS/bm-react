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

  type CartItem = {
    image: string | undefined;
    title: string | undefined;
    id: number;
    quantity: number;
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

     cart: CartItem[];
    getCart: () => void;
    addToCart: (productId: number, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateCartQuantity: (id: number, quantity: number) => void; 

     
   
}



const ProductContext= createContext<ProductContextType |undefined>(undefined);



export const ProductProvider : React.FC<{children:ReactNode}> =({
    children,
}) =>{
    const [product, setProduct] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);

    
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
            JSON.stringify(product), 
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
      
          return response.status;
        } catch (error) {
          throw new Error("Error in posting product");
        }
      };

      const addToCart = async (productId: number, quantity: number) => {
        try {
            // Fetch product details
            const productResponse = await axios.get(`https://fakestoreapi.com/products/${productId}`);
            const product = productResponse.data;
    
            // Add to cart API call
            const response = await axios.post(`https://fakestoreapi.com/carts`, {
                userId: 1,
                date: new Date().toISOString(),
                products: [{ productId, quantity }],
            });
    
            if (response.status === 200) {
                setCart([...cart, {
                    id: productId,
                    quantity,
                    image: product.image,  // Include image
                    title: product.title   // Include title
                }]);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
 

    const removeFromCart = async (productId: number) => {
        try {
            const updatedCart = cart.filter(item => item.id !== productId);
            setCart(updatedCart);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const getCart = async () => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/carts/1`);
            if (response.status === 200) {
              alert(`Item added to card  status :${response.status}` )
                setCart(response.data.products);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
      // ✅ New function to update quantity
  const updateCartQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, quantity) } : product
      )
    );
  };

      

    return (
        <ProductContext.Provider
          value={{
            updateCartQuantity,
            product,
            getProducts,
            getproduct,
            updateProduct,
            deleteProduct,
            getCategories,
            getProductByCategory,postProductt,
            cart,
                getCart,
                addToCart,
                removeFromCart,
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

