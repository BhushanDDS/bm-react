import React, { useEffect } from 'react';
import './App.css';
import { useProductContext } from '../contexts/ProductContext';
import AllProducts from '../components/AllProducts';
import Footer from '../components/Layouts/Footer';
import Header from '../components/Layouts/Header';

function App() {
  const {categories, products, getProducts, getCategories, getProductByCategory } = useProductContext();

  useEffect(() => {
    getProducts?.();
    getCategories?.();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white shadow-md">
        <Header />
      </nav>

      {/* Category & Fetch Buttons */}
      <div className="flex flex-wrap justify-center gap-3 my-6">
        <button
          onClick={() => getProducts?.()}
          className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all"
        >
          Get All Products
        </button>

        {/* Fetch categories from context */}
        {categories.map((category, index) => (
  <button
    key={`${category}-${index}`}
    onClick={() => getProductByCategory?.(category)}
    className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-all"
  >
    {category}
  </button>
))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
      {products?.map((product) => (
  product?.id && <AllProducts key={product.id} product={product} />
))}

      </div>
    </>
  );
}

export default App;
