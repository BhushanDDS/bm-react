import React,{ useState,useReducer,useCallback,useMemo } from 'react'
import './App.css'
import {TaskContextProvider } from './contexts/TaskContext.jsx'

import nextId from "react-id-generator";
import ItemList from './components/ItemList.jsx';


const reducer =(state,action)=>{
  switch(action.type){
    case "add-task":
      return [{ id: nextId(), task: action.payload, isComplete: false }, ...state];

    case "update-task":
    return state.map((task) =>
      task.id === action.payload.id ? { ...task, ...action.payload.newTask } : task
    );

    case "handle-toggle":
      return state.map((task) =>
        task.id === action.payload ? { ...task, isComplete: !task.isComplete } : task
      );
    case "remove-task":
      return state.filter((task) => task.id !== action.payload);
    
    default:
      return state

  }
}

function App() {



  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [state, dispatch] = useReducer(reducer, [])

  const addTask = useCallback(() => {
    if (!task) return;
    dispatch({ type: "add-task", payload: task });
    setTask("");
  }, [task]);

  const updateTask = useCallback((id, newTask) => {
    dispatch({ type: "update-task", payload: { id, newTask } });
  }, []);

  const toggleComplete = useCallback((id) => {
    dispatch({ type: "handle-toggle", payload: id });
  }, []);

  const removeTask = useCallback((id) => {
    dispatch({ type: "remove-task", payload: id });
  }, []);

  const tasksmemo = useMemo(() => state, [state]);

console.log(tasksmemo);

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
        {state.map((task) => (
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
