import React,{ useEffect, useState } from 'react'
import './App.css'

import {ProductProvider,useProductContext} from '../contexts/ProductContext'
import AllProducts from  '../components/AllProducts'
import Footer from '../components/Layouts/Footer'
import Header from '../components/Layouts/Header'
function App() {
  type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
  };

 

  const [products, setproducts] = useState<Product[]| undefined>(undefined)
  const [categories, setcategories] = useState<string[] | undefined>(undefined);
  const [getallProducts, setgetallProducts] = useState()

  const {getProducts,getCategories,getProductByCategory} = useProductContext();




  useEffect(()=>{
   
    const fetchCategories = async () => {
      try {
          const response:any = await getCategories();
          setcategories(response);
      } catch (error) {
          console.error("Error fetching categories:", error);
      }
  };
  fetchCategories();


  },[])

  const handleCategoryClick = async (category: string) => {
    try {
        const response:any = await getProductByCategory(category);
        setproducts(response);
    } catch (error) {
        console.error("Error fetching products by category:", error);
    }
};

const getAllProducts =async()=>{
  setproducts([])
  try {
    const response:any = await getProducts();
    setproducts(response);
} catch (error) {
    console.error("Error fetching all products :", error);
}
}



return (
  <>
    {/* Navbar */}
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <Header />
    </nav>

    {/* Category & Fetch Buttons */}
    <div className="flex flex-wrap justify-center gap-3 my-6">
      <button 
        onClick={getAllProducts} 
        className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
      >
        Get All Products
      </button>

      {categories?.map((val) => (
        <button 
          key={val} 
          onClick={() => handleCategoryClick(val)} 
          className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-all"
        >
          {val}
        </button>
      ))}
    </div>

    {/* Products Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
      {products?.map((val) => (
        <AllProducts key={val.id} product={val} />
      ))}
    </div>
  </>
);

}

export default App
