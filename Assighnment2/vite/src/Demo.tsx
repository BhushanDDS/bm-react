
import { useEffect, useState } from 'react'
import nextId from "react-id-generator";

import './App.css'
import TaskList from './Components/TaskList';

function Demo() {
    interface Todo {
        id: string;
        task: string;
      }

    const [todo,setTodo]=useState<Todo>({id:"",task:""});
    const [todolist, settodolist]=useState<Todo[]>([])

    const addTodo=()=>{

        if(!todo)return;

        if(todo.id){
            settodolist((prev) =>
                prev.map((task) =>
                  task.id === todo.id ? { ...task, task: todo.task } : task
                )   )
            
            }else{
            
            const id1 = nextId();
            const newTask:Todo={
            id:id1,
            task:todo.task
              }
             settodolist((prev)=>[...prev,newTask])

        }
      


      
        setTodo({id:"",task:""});
    
    }


    useEffect(()=>{

        if(todolist.length>0){

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
        const foundTask = todolist.find((task:Todo) => task.id === id);
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

<div>

<input type="text" 
value={todo.task}
onChange={(e)=>setTodo({...todo,task:String(e.target.value)})}
/>
<button
onClick={addTodo}
>Send Todo</button>
</div>

<div>
{todolist.map((task) => (
        <TaskList key={task.id}
          task={task.task} 
          ondelete={()=>deleteTodo(task.id)}
          onupdate={()=>UpdateTodo(task.id)}
        
        />
      ))}
</div>

</>
  )
}

export default Demo