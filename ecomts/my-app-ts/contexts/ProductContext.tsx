import axios from 'axios';
import React,{createContext , ReactNode, useReducer,useContext} from 'react'

type Product = {
    id: number;
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

  type State = {
    products: Product[];
    categories: string[];
    cart: CartItem[];
  };
  

type Action =
| { type: 'SET_PRODUCTS'; payload: Product[] }
| { type: 'SET_CATEGORIES'; payload: string[] }
| { type: 'ADD_TO_CART'; payload: CartItem }
| { type: 'REMOVE_FROM_CART'; payload: number } // payload is product id
| { type: 'SET_CART'; payload: CartItem[] }
| { type: 'UPDATE_CART_QUANTITY'; payload: { id: number; quantity: number } };


const initialState: State = {
  products: [],
  categories: [],

  cart: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'SET_CART':
      return { ...state, cart: action.payload };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    default:
      return state;
  }
};

type ProductContextType={
     products:Product[];
     categories: string[]; 
     getproduct:(id:any)=>void
     getProducts: () => Promise<void>;
     getCategories: () => Promise<void>;
     getProductByCategory: (category: string) => Promise<void>;
     updateProduct?:(id:any)=>void;
     deleteProduct?:(id:any)=>void;
     postProductt?:(data:Product)=>void;
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
  const [state, dispatch] = useReducer(reducer, initialState);


    const getProducts = async () => {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      if (!response) throw new Error("Error fetching all products");
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
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
    // ✅ Fetch Categories
  const getCategories = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      dispatch({ type: 'SET_CATEGORIES', payload: response.data });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

 const getProductByCategory = async (category: string) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
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
      const productResponse = await axios.get(`https://fakestoreapi.com/products/${productId}`);
      const product = productResponse.data;
      const response = await axios.post(`https://fakestoreapi.com/carts`, {
        userId: 1,
        date: new Date().toISOString(),
        products: [{ productId, quantity }],
      });

      if (response.status === 200) {
        dispatch({
          type: 'ADD_TO_CART',
          payload: {
            id: productId,
            quantity,
            image: product.image,
            title: product.title,
          },
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const getCart = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/carts/1`);
      if (response.status === 200) {
        alert(`Item added to cart, status: ${response.status}`);
        dispatch({ type: 'SET_CART', payload: response.data.products });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
  };
      

 return (
        <ProductContext.Provider
          value={{
            products: state.products,
            cart: state.cart,
            categories: state.categories,
            updateCartQuantity,
            getProducts,
            getproduct,
            updateProduct,
            deleteProduct,
            getCategories,
            getProductByCategory,postProductt,
             
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

