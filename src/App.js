import { useEffect, useState } from "react";
import "./index.css";
import {v4 as uuidv4} from "uuid";

function App() {
    // track state 
    const [todos, setTodos] = useState(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem("todos");
    // if todos is stored
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      // return an empty array
      return [];
    }
  });
  // track state of input 
  const [todo, setTodo] = useState("");

  // useEffect will run once when mounted
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // get the value of the input and set the new state
  function handleInputChange(e) {
    // set the new state value to what's currently in the input
    setTodo(e.target.value);
  }

  // create a new object on form submit
  function handleFormSubmit(e) {
    // prevent the browser default refresh
    e.preventDefault();

    // if todo is not empty
    if (todo !== "") {
      // set the new todos state 
      setTodos([
        // copy the current values in state
        ...todos,
        {
          // setting an id 
          id: uuidv4(), 
          // set a text property to the value of the todo state 
          // remove whitespace
          text: todo.trim()
        }
      ]);
    }
    // clear out the input 
    setTodo("");
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <input
          name="todo"
          type="text"
          placeholder="Create Todo..."
          value={todo}
          onChange={handleInputChange}
        />
        <button>Add</button>
      </form>
        {todos.map((todo) => (
          <div key={todo.id} className="todo-list">
              <p >{todo.text}<span><button onClick={() => removeTodo(todo.id)}>Delete</button></span></p>   
          </div>
        ))}
    </div>
  );
}
export default App;