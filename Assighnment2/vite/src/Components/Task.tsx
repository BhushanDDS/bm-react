import React from 'react'
type auth ={
     task: string; 
     onDelete:()=>void
     onEdit:()=>void
}
function Task({task,onDelete,onEdit}:auth) {
    return (
        <>
          <div className="p-4 border rounded-lg shadow-md bg-white">
            <p className="text-gray-700">{task}</p>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={onEdit} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button 
                onClick={onDelete} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      );
      
}

export default Task