import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [remarksInput, setRemarksInput] = useState('');
  const [isDoneInput, setIsDoneInput] = useState(false);

  // Get user ID from local storage (or your authentication method)
  const userId = localStorage.getItem('userId');

  // Your API base URL
  const API_URL = 'YOUR_LIVE_API_URL';

  // FETCH - Get all todos for the logged-in user
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos?userId=${userId}`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // CREATE - Add a new todo linked to the user
  const addTodo = async () => {
    if (todoInput.trim() === '') return alert('Please enter a task');

    const newTodo = {
      userId: userId,
      toDo: todoInput,
      remarks: remarksInput,
      isDone: isDoneInput
    };

    try {
      await axios.post(`${API_URL}/todos`, newTodo);
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }

    // Clear inputs
    setTodoInput('');
    setRemarksInput('');
    setIsDoneInput(false);
  };

  // UPDATE - Toggle the isDone status of a todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(`${API_URL}/todos/${id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // DELETE - Remove a todo linked to the user
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}?userId=${userId}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Fetch todos when component loads
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo Activity</h1>

      <div>
        <input 
          type='text' 
          name='todo' 
          placeholder='What do you want to do?' 
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />

        <input 
          type='text' 
          name='remarks' 
          placeholder='Say something about this task' 
          value={remarksInput}
          onChange={(e) => setRemarksInput(e.target.value)}
        />

        <input 
          type='checkbox' 
          name='isDone' 
          checked={isDoneInput}
          onChange={(e) => setIsDoneInput(e.target.checked)}
        /> Are you done with this task?

        <button onClick={addTodo}>Add Task</button>
      </div>

      <hr />

      <div>
        <h2>Your Todos:</h2>
        <ul>
          {todos.map(todo => (
            <li key={todo._id}>
              <strong>{todo.toDo}</strong> - {todo.remarks} - {todo.isDone ? 'Done' : 'Not Done'}
              <input 
                type="checkbox" 
                checked={todo.isDone} 
                onChange={(e) => 
                  updateTodo(todo._id, {
                    ...todo,
                    isDone: e.target.checked
                  })
                }
              />
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;
