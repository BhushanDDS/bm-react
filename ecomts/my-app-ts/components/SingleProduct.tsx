import React,{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductContext } from '../contexts/ProductContext';
import {useNavigate} from 'react-router-dom'
type Product = {

  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;

};
function SingleProduct() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const { getproduct } = useProductContext();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response:any = await getproduct(id);
                setProduct(response);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={()=>{
              navigate('/');
            }}>Go back to Homepage</button>

        </>
    );
}

export default SingleProduct;
