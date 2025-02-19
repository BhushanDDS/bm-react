import React from 'react'
interface Iauth{
  title:string;
  body:string;
  id?:number;
}

function TopPost({title,body,id}:Iauth) {
    return (
        <>
          <div className="p-4 bg-white rounded-lg shadow-md border">
            <p className="text-gray-700"><strong>ID:</strong> {id}</p>
            <p className="text-gray-700"><strong>Title:</strong> {title}</p>
            <p className="text-gray-700"><strong>Body:</strong> {body}</p>
          </div>
        </>
      );
      
}

export default TopPost