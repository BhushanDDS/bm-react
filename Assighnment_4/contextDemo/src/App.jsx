import React,{ useState } from 'react'
import './App.css'
import {TaskContextProvider , useTaskContext} from './contexts/TaskContext.jsx'

import nextId from "react-id-generator";
import ItemList from './components/ItemList.jsx';


function App() {


  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTask=()=>{

    if(!task) return;

    const id1 = nextId();
    setTasks((prev) => [{id: id1, task:task ,isComplete :false}, ...prev] )
    setTask("")
  }

  const updateTask=(id,newTask)=>{
    setTasks((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, ...newTask } : prevTodo)));

  }

  const toggleComplete=(id)=>{
    setTasks((prev) => 
      prev.map((prevTodo) => 
        prevTodo.id === id ? { ...prevTodo, 
          isComplete: !prevTodo.isComplete } : prevTodo))
  }

  const removeTask=(id)=>{
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }




return (
  <TaskContextProvider value={{ addTask, removeTask, tasks, toggleComplete, updateTask }}>
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      
      <div className="flex gap-3 mb-6">
        <input 
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button 
          onClick={addTask} 
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
        >
          Create Task
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <ItemList task={task} />
          </div>
        ))}
      </div>

    </div>
  </TaskContextProvider>
)

}

export default App
