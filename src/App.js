import React, {useState, useEffect} from 'react';
import './App.css';
//Importning components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //creating states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //When app starts, Run it only once.
  useEffect(()=>{
    getLocalTodos();
  }, []);
  //useEffect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
  //Functions
  const filterHandler = () =>{
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed===true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed===false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //save todos locally
  const saveLocalTodos = () =>{
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  //Getting Local Todos
  const getLocalTodos = () =>{
    if(localStorage.getItem('todos') === null ){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <marquee><h1>2 Do List</h1></marquee>
      </header>
      <div class="spinner">
        <div class="cube1"></div>
        <div class="cube2"></div>
      </div>
      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;
