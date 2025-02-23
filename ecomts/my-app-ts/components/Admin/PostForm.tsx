import React, { useState } from 'react'
import {useProductContext} from '../../contexts/ProductContext'

type ratings={
    rating:number;
}
type Product={
    title:string ;
    price :number;
    description:string;
    image :string;
    category :string;
    ratings?:ratings

}
function PostForm() {

    const {postProductt}=useProductContext()
    const [data, setdata] = useState<Product>({
        title: "",
        price: 0,
        description: "",
        image: "",
        category: "",
      });
      const subitHandler = async (e: React.FormEvent) => {
        e.preventDefault(); 
      
        try {
          const response: any = await postProductt(data);
          if (response === 201 || response === 200) {
            alert(`Product Posted Successfully! Status code: ${response}`);
            setdata({ title: "", price: 0, description: "", image: "", category: "" });
          }
        } catch (error) {
          console.error("Error submitting product:", error);
        }
      };
      
      
  return (

  

  
  <>

  <div>
    
    <form action="" method="post" onSubmit={subitHandler}>
        <label htmlFor="title">Enter Title</label>
        <input type="text" id='title'  value={data?.title} 
        onChange={(e)=>setdata({...data,title:e.target.value})}/>

<label htmlFor="price">Enter Pricce</label>
        <input type="number" id='price'  value={data?.price} 
        onChange={(e)=>setdata({...data,price:Number(e.target.value)})}/>

<label htmlFor="description">Enter Description</label>
        <input type="text" id='description'  value={data?.description} 
        onChange={(e)=>setdata({...data,description:e.target.value})}/>

<label htmlFor="image">Enter Image</label>
        <input type="text" id='image'  value={data?.image} 
        onChange={(e)=>setdata({...data,image:e.target.value})}/>
        
<label htmlFor="category">Enter Category</label>
        <input type="text" id='category'  value={data?.category} 
        onChange={(e)=>setdata({...data,category:e.target.value})}/>

        <button type='submit'>Submit</button>

    </form>
  </div>
  
  
  </>
  )
}

export default PostForm