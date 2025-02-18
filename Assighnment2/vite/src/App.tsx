
import { useEffect, useState } from 'react'
import nextId from "react-id-generator";

import './App.css'
import TaskList from './Components/TaskList';

function Demo() {
    interface ITodo {
        id: string;
        task: string;
      }

    const [todo,setTodo]=useState<ITodo>({id:"",task:""});
    const [todolist, settodolist]=useState<ITodo[]>([])

    const addTodo=()=>{

        if(!todo)return;

        if(todo.id){
            settodolist((prev) =>
                prev.map((task) =>
                  task.id === todo.id ? { ...task, task: todo.task } : task
                )   )
            
            }else{
            
            const id1 = nextId();
            const newTask:ITodo={
            id:id1,
            task:todo.task
              }
             settodolist((prev)=>[...prev,newTask])

        }
      


      
        setTodo({id:"",task:""});
    
    }


    useEffect(()=>{

        if(todolist.length>=0){

            localStorage.setItem("todolist",JSON.stringify(todolist))
        }

    },[todolist])


    useEffect(()=>{

        const alltasks= localStorage.getItem("todolist")
        if(alltasks){
            settodolist(JSON.parse(alltasks));
        }
    },[])

    const UpdateTodo = (id: string) => {
        const foundTask = todolist.find((task:ITodo) => task.id === id);
        if (foundTask) {
          setTodo(foundTask);
        }

    };
    
    const deleteTodo=(id: string)=>{
       const newTodoList = todolist.filter((task) => task.id !== id);
       settodolist(newTodoList);
    }
    
    return (
      <>
        <div className="w-full max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={todo.task}
              onChange={(e) => setTodo({ ...todo, task: String(e.target.value) })}
              placeholder="Enter your task"
              className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={addTodo}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Send Todo
            </button>
          </div>
        </div>
    
        <div className="mt-4 space-y-3">
          {todolist.map((task) => (
            <TaskList 
              key={task.id}
              task={task.task} 
              ondelete={() => deleteTodo(task.id)}
              onupdate={() => UpdateTodo(task.id)}
            />
          ))}
        </div>
      </>
    )
    
}

export default Demo