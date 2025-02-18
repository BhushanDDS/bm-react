import { useEffect, useState } from 'react'
import './App.css'
import Task from './Components/Task';

function App() {
  const [todo, setTodo] = useState<string>("")
  const [todos,setTodos]=useState<string[]>([])
  const [ind,setInd]=useState<number|null>(null);


const addTodo=()=>{
if(!todo) return;

if(ind!== null){
  setTodos(todos.map((t,index)=> index === ind ? todo : t))
  setInd(null);
}else{
  setTodos([...todos,todo]);

}
setTodo("");
}



const deleteTodo=(index: number)=>{
const newTodo=todos.filter((val,ind)=>ind!==index)
setTodos(newTodo)
localStorage.setItem("alltodos",JSON.stringify(todos));

}
  
const updateTodo=(index: number)=>{
setTodo(todos[index])
setInd(index)
}

useEffect(()=>{
  if(todos.length>=0){
    localStorage.setItem("alltodos",JSON.stringify(todos));
  }
  },[todos])
  

  useEffect(()=>{
  const alltodos= localStorage.getItem("alltodos");
  if(alltodos){
    setTodos(JSON.parse(alltodos))
  }
  },[])



return (
  <>
    <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold mb-4">Todo App</h1>
      
      <div className="flex gap-2">
        <input 
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add Task Here"
          className="flex-grow p-2 border rounded-md"
        />
        <button 
          onClick={addTodo}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>
    </div>

    <div className="mt-4 space-y-3">
    <div className="text-xl font-semibold mb-2 text-center">Tasks</div>

      {todos.map((task, index) => (
        <Task 
          key={index} 
          task={task} 
          onDelete={() => deleteTodo(index)} 
          onEdit={() => updateTodo(index)}
        />
      ))}
    </div>
  </>
);

}

export default App
