import React,{useState} from 'react'
import {useTaskContext} from '../contexts/TaskContext.jsx'

const ItemList = ({task}) => {
    const [todoMsg, setTodoMsg] = useState(task.task)
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const {removeTask,updateTask,toggleComplete}=useTaskContext();

const update=()=>{
    updateTask(task.id,{...task,text:todoMsg})
    setIsTodoEditable(false)
}

const deleteT=()=>{
    removeTask(task.id)
}

const toggle=()=>{
    toggleComplete(task.id)
}

   
return (
    <div className="max-w-lg mx-auto bg-white p-4 shadow-md rounded-lg border border-gray-200">
      <div className={`flex items-center justify-between p-3 rounded-lg ${task.isComplete ? "bg-gray-200" : "bg-gray-50"}`}>
        
        <input 
          type="checkbox"
          checked={task.isComplete}
          onChange={toggle}
          className="w-5 h-5 cursor-pointer"
        />
        
        <input 
          type="text" 
          className={`flex-1 mx-3 p-2 border rounded-md focus:outline-none transition-all 
            ${isTodoEditable ? "border-blue-400 bg-white" : "border-transparent bg-gray-100"} 
            ${task.isComplete ? "line-through text-gray-500" : "text-gray-800"}
          `}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
  
        <button 
          onClick={() => {
            if (task.isComplete) return;
            if (isTodoEditable) {
              update();
            } else {
              setIsTodoEditable((prev) => !prev);
            }
          }}
          disabled={task.isComplete}
          className={`px-4 py-1 text-white font-medium rounded-md transition-all 
            ${task.isComplete ? "bg-gray-400 cursor-not-allowed" : isTodoEditable ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
          `}
        >
          {isTodoEditable ? "Save" : "Edit"}
        </button>
  
        <button 
          onClick={deleteT} 
          className="px-4 py-1 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-all"
        >
          Delete
        </button>
  
      </div>
    </div>
  )
  
}

export default ItemList