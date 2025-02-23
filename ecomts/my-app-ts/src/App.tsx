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
    < >

    <nav>
      <Header/>
    </nav>

      <div>
       
       <button onClick={getAllProducts}>Get All Products</button>
      {categories?.map((val) => (
  <button key={val} onClick={() => handleCategoryClick(val)}>{val}</button>
))}

      </div>



      <div>
      {
       products?.map((val)=>(
        <AllProducts key={val.id} product={val}  />
       ))
      }  
      </div>


    </>
  )
}

export default App
