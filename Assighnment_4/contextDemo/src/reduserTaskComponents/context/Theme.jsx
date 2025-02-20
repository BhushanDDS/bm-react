import {createContext,useContext} from "react"

const ThemeContexgt= createContext({
    theme:"light",
    assighnTheme:()=>{},

})


export const ThemeContextProvider = ThemeContexgt.Provider;

export  function useThemeContextProvider (){
    return useContext(ThemeContexgt);

}