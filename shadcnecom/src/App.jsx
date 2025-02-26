import React, { useEffect, useState } from "react";
import "./App.css";
import { useProductContext } from "./contexts/ProductContext";
import ProductCard from "./product/ProductCard";
import Header from "./Layout/Header";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

function App() {
  const {
    getAllProducts,
    getAllCategories,
    getProductsByCategory,
    products,
    categories,
    sortAsc,
    sortDsc,
  } = useProductContext();

  const [selectedCategory, setSelectedCategory] = useState("All Products");

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  const categoryHandler = (selectedCategory) => {
    setSelectedCategory(selectedCategory); // Update the selected category

    if (selectedCategory === "All Products") {
      getAllProducts();
    } else {
      getProductsByCategory(selectedCategory);
    }
  };

  const orderHandler = (selectedOption) => {
    if (selectedOption === "asc") {
      sortAsc();
    }
    if (selectedOption === "dsc") {
      sortDsc();
    }
  };

  return (
    <>
      <Header />

      <div className="flex flex-wrap justify-center gap-4 p-6">
        <Select onValueChange={categoryHandler} value={selectedCategory}>
          <SelectTrigger className="w-60">
            <SelectValue>{selectedCategory}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Products">All Products</SelectItem>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={orderHandler}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending Order</SelectItem>
            <SelectItem value="dsc">Descending Order</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          [...Array(8)].map((_, i) => (
            <Skeleton key={i} className="w-full h-72 rounded-lg" />
          ))
        )}
      </div>
    </>
  );
}

export default App;
