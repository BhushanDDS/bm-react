import React from 'react'
import {useProductContext} from '../contexts/ProductContext'
import {useNavigate} from 'react-router-dom'
type Product = {product:{

    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}
  };

function AllProducts({product}:Product) {
    const navigate=useNavigate();


    const singleProductHandler = () => {
        navigate(`/getsingleproduct/${product.id}`);
    };
return (
<>

<p>image - {product.image}</p>
<p>title -{product.title}</p>
<p>title -{product.price}</p>
<button
onClick={singleProductHandler}
>Get Single Product </button>

</>)
}

export default AllProducts