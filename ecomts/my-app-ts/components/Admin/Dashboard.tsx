import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router';
import PostForm from './PostForm'
import Admin_Product from './Admin_Product'
import { useProductContext } from "../../contexts/ProductContext";
import { useAuth } from '../../contexts/AuthContext';
type Product = {
  id?: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

function Dashboard() {
  const { dispatch } = useAuth();

  const navigate = useNavigate();
// const handleLogout=()=>{
// nav('/')
// }


const handleLogout = () => {
  dispatch({ type: "LOGOUT" }); 
  navigate("/admin-login");
};
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
    <div className="min-h-screen bg-gray-100 p-6">
      
      <nav className="bg-white shadow-md flex justify-between items-center px-6 py-4 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </nav>
  
      <div className="mt-6 max-w-4xl mx-auto">
        
        <div className="mb-6 bg-white shadow-md p-4 rounded-lg">
          <PostForm />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((val) => (
            <Admin_Product key={val.id} product={val} />
          ))}
        </div>
  
      </div>
  
    </div>
  );
  
}

export default Dashboard