import {createContext,useContext} from "react"

const CounterContext = createContext({

    counter :0,
    assighnCounter:()=>{

    },

})
export const CounterProvidr= CounterContext.Provider

export function useCounterContext (){
    return useContext(CounterContext)
}