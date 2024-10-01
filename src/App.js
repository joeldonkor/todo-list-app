// import React, { useState, useRef, useEffect } from 'react';



import React, { useState, useRef, useEffect,useCallback } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { MdDeleteSweep } from 'react-icons/md';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editing, setEditing] = useState(null);
  const [newTodoText, setNewTodoText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const editInputRef = useRef(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditing(index);
    setNewTodoText(todos[index].text);
  };

  const handleSave = useCallback(() => {
    if (newTodoText.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[editing].text = newTodoText;
      setTodos(updatedTodos);
      setEditing(null);
    }
  }, [editing, newTodoText, todos]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDeleteAll = () => {
    setTodos([]); 
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && editing !== null) {
        handleSave(); 
      }
    };

    if (editing !== null) {
      document.addEventListener('keydown', handleKeyDown);
      if (editInputRef.current) {
        editInputRef.current.focus(); 
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Clean up event listener
    };
  }, [editing, newTodoText,handleSave]);

  return (
    <div className={`wrapper ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`wrapper-below ${darkMode ? 'dark-mode' : ''}`}>
        <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
          <header className='header'>
            <h1>Todo List</h1>

            {darkMode ? (
              <MdOutlineLightMode className="dark-mode-icon" onClick={toggleDarkMode} />
            ) : (
              <MdDarkMode className="dark-mode-icon" onClick={toggleDarkMode} />
            )}
          </header>

          <form onSubmit={handleSubmit} className='todo-form'>
            <div className='input-container'>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className={darkMode ? 'dark-mode' : ''}
              />
              <button type="submit" className={`add-button ${darkMode ? 'dark-mode' : ''}`}>Add</button>
            </div>
          </form>

          <div className={`todo-container ${darkMode ? 'dark-mode' : ''}`}>
            <div className='task-length'>
              <p>{todos.length} Tasks Added</p>

              {todos.length > 0 && (
                <MdDeleteSweep className='delete-all' onClick={handleDeleteAll} />
              )}
            </div>

            <ul className="todo-grid">
              {todos.map((todo, index) => (
                <li key={index} className={`todo-item ${darkMode ? 'dark-mode' : ''}`}>
                  {editing === index ? (
                    <>
                      <div className='edit-list'>
                        <input
                          ref={editInputRef}
                          type="text"
                          value={newTodoText}
                          onChange={(e) => setNewTodoText(e.target.value)}
                          className={`edit-input ${darkMode ? 'dark-mode' : ''}`}
                        />
                        <button onClick={handleSave} className={`save-button ${darkMode ? 'dark-mode' : ''}`}>Save</button>
                      </div>
                      
                    </>
                  ) : (
                    <>
                      <div className='list'>
                        <span className='todo-text'>{todo.text}</span>
                        <div className='buttons'>
                          <button onClick={() => handleDelete(index)} className={darkMode ? 'dark-mode' : ''}>
                            <RiDeleteBinLine />
                          </button>
                          <button onClick={() => handleEdit(index)} className={darkMode ? 'dark-mode' : ''}>
                            <FaRegEdit />
                          </button>
                        </div>
                      </div>
                     
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
