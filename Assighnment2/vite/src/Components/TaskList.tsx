import React from 'react'
interface auth{
    task:string;
    ondelete:()=>void;
    onupdate:()=>void;



}


function TaskList({task,ondelete,onupdate}:auth) {

     
 
    return (
        <>
          <div className="p-4 border rounded-lg shadow-md bg-white flex justify-between items-center">
            <div className="text-gray-700">{task}</div>
            <div className="flex gap-2">
              <button 
                onClick={ondelete} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button 
                onClick={onupdate} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Update
              </button>
            </div>
          </div>
        </>
      )
      
}

export default TaskList