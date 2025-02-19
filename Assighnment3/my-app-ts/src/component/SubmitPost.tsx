import axios from 'axios';
import React, { useState } from 'react'

function SubmitPost() {

type post={
    userId:number;
    id:number;
    title:string;
    body:string;
}


const [post, setpost] = useState<post>()



const sendPostHandler= async()=>{
    try {
        
        const res=await axios.post('https://jsonplaceholder.typicode.com/posts');
        if(res.status===200 || res.status===201){
     alert(`Post sent Status code: ${res.status}`)
     setpost(res.data)
        }
        else{
            alert('Post operation failed')
        }
    } catch (error) {
        console.log("error",error);
        
    }

}

return (
    <>
      <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
        <input 
          type="text"
          placeholder="Enter userId"
          value={post?.userId}
          onChange={(e) => e.target.value}
          className="w-full p-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400"
        />
  
        <input 
          type="text"
          placeholder="Enter title"
          value={post?.title}
          onChange={(e) => e.target.value}
          className="w-full p-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400"
        />
  
        <input 
          type="text"
          placeholder="Enter body"
          value={post?.body}
          onChange={(e) => e.target.value}
          className="w-full p-2 border rounded-md mb-2 focus:ring-2 focus:ring-blue-400"
        />
  
        <button 
          onClick={sendPostHandler}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Send
        </button>
      </div>
    </>
  )
  
}


export default SubmitPost