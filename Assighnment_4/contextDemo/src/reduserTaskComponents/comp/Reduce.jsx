import { useReducer } from "react";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, counter: state.counter + 1 };
    case "toggle-theme":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
};

function App() {
  const initialState = { counter: 0, theme: "light" };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app-container">
      <p>{state.counter}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        Increment 
      </button>

      <p>{state.theme}</p>
      <button onClick={() => dispatch({ type: "toggle-theme" })}>
toggle      </button>
    </div>
  );
}

export default App;
