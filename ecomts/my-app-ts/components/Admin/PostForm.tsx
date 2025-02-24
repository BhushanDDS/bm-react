import React, { useState } from "react";
import { useProductContext } from "../../contexts/ProductContext";
import { useMutation } from "@tanstack/react-query";

type Ratings = {
  rate:number ;
  count: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  ratings?: Ratings;
};

const PostForm = () => {
  const { status, postProductt } = useProductContext();

  const postProduct = async (product: Product) => {
    const response:any = await postProductt(product);
    return status;
  };

  const [data, setData] = useState<Product>({
    id: 1,
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["postProduct"],
    mutationFn: postProduct, 
    onSuccess: () => {
      alert(`Product Posted Successfully!`);
      setData({ id: 1, title: "", price: 0, description: "", image: "", category: "" });
    },
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(data); 
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200 mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Add Product</h2>

      {error && <p className="text-red-500 text-center">{(error as Error).message}</p>}

      <form className="space-y-4" onSubmit={submitHandler}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={data.price}
            onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            value={data.image}
            onChange={(e) => setData({ ...data, image: e.target.value })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-2 text-white rounded-md transition-all ${
            isPending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
