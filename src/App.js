import './App.css';
import Header from './MyComponents/header.js';
import Todos from './MyComponents/todos';
import AddTodo from './MyComponents/addTodo';
import Footer from './MyComponents/footer';
import { About } from './MyComponents/about';
import React,{useState,useEffect} from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete=(todo)=>{
    console.log("i am on delete",todo)

    setTodos(todos.filter((e)=>{
      return e!==todo;
    }))
    localStorage.setItem("todos", JSON.stringify(todos));
  }


  const addTodo=(title,desc)=>{
    let sno = 0;
  if (todos.length !== 0) {
    sno = todos[todos.length - 1].sno + 1;
  }

    const myTodo={
      sno:sno,
      title:title,
      desc:desc
    }

    console.log(myTodo);
    setTodos([...todos,myTodo]);
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <Router>
      <Header title="My Todos List" searchBar={false}/>
      <Routes>
      <Route exact path="/" element={<>
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} />
          </>} />
          <Route exact path="/about" element={<About />} /> 
        </Routes>
      <Footer/>
      </Router>
    </>
  );
}

export default App;
