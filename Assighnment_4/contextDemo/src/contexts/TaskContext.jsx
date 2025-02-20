import React,{createContext,useContext} from "react"

const TaskContext= createContext({
    tasks:[{
    }],
    addTask:() => {},
    
    updateTask:(id,task) => {},
    
    removeTask:(id) => {},
    
    toggleComplete:(id) => {},
})

export  function useTaskContext(){
    const context= useContext(TaskContext);
    return context;
    }

export const TaskContextProvider =TaskContext.Provider;

