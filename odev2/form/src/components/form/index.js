import React, { useState } from "react";
import "./styles.css"; 

function TodoApp() {
  const [addTodoInput, setAddTodoInput] = useState("");
  const [allTodo, setAllTodo] = useState([]);
  const [page, setPage] = useState("all");
  const [complatedTodos, setComplatedTodos] = useState([]);

  const changeTodoInput = (e) => {
    setAddTodoInput(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && addTodoInput.trim() !== "") {
      setAllTodo((prevTodos) => [...prevTodos, addTodoInput]);
      setAddTodoInput("");
    }
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (complatedTodos.includes(value)) {
      setComplatedTodos(complatedTodos.filter((todo) => todo !== value));
    } else {
      setComplatedTodos([...complatedTodos, value]);
    }
  };

  const handleDelete = (todo) => {
    setAllTodo(allTodo.filter(item => item !== todo));
    setComplatedTodos(complatedTodos.filter(item => item !== todo));
  };

  const activeTodos = allTodo.filter(item => !complatedTodos.includes(item));

  return (
    <div className="todo-app">
      <h1 className="todo-header">Todo List</h1>
      <div className="todo-input-container">
        <input
          className="todo-input"
          name="add_todo"
          value={addTodoInput}
          onChange={changeTodoInput}
          onKeyDown={handleKeyDown}
          placeholder="Add a new todo..."
        />
      </div>

      <div className="todo-list">
        {(page === "all" ? allTodo : page === "complated" ? complatedTodos : activeTodos).map((todo, index) => (
          <div className="todo-item" key={index}>
            <input
              type="checkbox"
              value={todo}
              checked={complatedTodos.includes(todo)}
              onChange={handleCheckboxChange}
              className="todo-checkbox"
            />
            <span className={`todo-text ${complatedTodos.includes(todo) ? "completed" : ""}`}>
              {todo}
            </span>
            <button onClick={() => handleDelete(todo)} className="delete-button">
              X
            </button>
          </div>
        ))}
      </div>

      <div className="todo-buttons">
        <button className= {page === "all" ? `active` : `todo-button`} onClick={() => setPage("all")}>All</button>
        <button className={page === "active" ? `active` : `todo-button`}  onClick={() => setPage("active")}>Active</button>
        <button className={page === "complated" ? `active` : `todo-button`}  onClick={() => setPage("complated")}>Completed</button>
      </div>

      <p className="current-page">Current Page: {page}</p>
    </div>
  );
}

export default TodoApp;
