import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router';
import PostForm from './PostForm'
import Admin_Product from './Admin_Product'
import { useProductContext } from "../../contexts/ProductContext";
type Product = {
  id?: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

function Dashboard() {
const nav= useNavigate();
const handleLogout=()=>{
nav('/')
}

  const { getProducts } = useProductContext();
  const [products, setProducts] = useState<Product[]>([]); 


 useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response: Product[]|any = await getProducts();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products in Admin_Product:", error);
      }
    };

    fetchProducts();
  }, []);
    
  return (
    <>
<nav>
    <h1>Admin Dashboard</h1>
    <button onClick={handleLogout}>Logout</button>
</nav>

<div>

    <PostForm/>


    <div>
      {products.map((val)=>(
        <Admin_Product 
        key={val.id}
        product={val}/>
      ))}
    </div>
</div>


    </>
  )
}

export default Dashboard