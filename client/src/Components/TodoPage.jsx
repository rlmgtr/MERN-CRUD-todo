import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../APIs/TodoAPIs';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [remarksInput, setRemarksInput] = useState('');
  const [isDoneInput, setIsDoneInput] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [firstName, setFirstName] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Get User's Todos
  const readTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Fetched Todos:', response.data); // Debugging Line
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      if (error.response && error.response.status === 401) {
        console.log('You are not logged in. Redirecting to login page.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  // Get User's Profile
  const getUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFirstName(response.data.firstName);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Create a New Todo
  const createTodo = async () => {
    if (todoInput.trim() === '') return alert('Please enter a task');

    const newTodo = {
      toDo: todoInput,
      remarks: remarksInput,
      isDone: isDoneInput
    };

    try {
      await axios.post(`${API_URL}/todos`, newTodo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      readTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }

    setTodoInput('');
    setRemarksInput('');
    setIsDoneInput(false);
  };

  // Update Todo using PATCH
  const updateTodo = async (id, updatedFields) => {
    try {
      await axios.patch(`${API_URL}/todos/${id}`, updatedFields, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      readTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      readTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Start Editing a Todo
  const startEdit = (todo) => {
    setEditingTodo(todo._id);
    setTodoInput(todo.toDo);
    setRemarksInput(todo.remarks);
    setIsDoneInput(todo.isDone);
  };

  // Save Edited Todo
  const saveEdit = async () => {
    if (todoInput.trim() === '') return alert('Please enter a task');
    
    const updatedTodo = {
      toDo: todoInput,
      remarks: remarksInput,
      isDone: isDoneInput
    };

    try {
      await updateTodo(editingTodo, updatedTodo);
      setEditingTodo(null);
      setTodoInput('');
      setRemarksInput('');
      setIsDoneInput(false);
    } catch (error) {
      console.error('Error saving edited todo:', error);
    }
  };

  // Effect to Load Data
  useEffect(() => {
    if (!token) {
      console.log('No token found. Redirecting to login page.');
      navigate('/login');
    } else {
      readTodos();
      getUserProfile();
    }
  }, [token, navigate]);

  // Test with Mock Data (Uncomment this to check if UI renders correctly)
  // useEffect(() => {
  //   setTodos([
  //     { _id: '1', toDo: 'Sample Task 1', remarks: 'Sample remark', isDone: false },
  //     { _id: '2', toDo: 'Sample Task 2', remarks: 'Another remark', isDone: true }
  //   ]);
  // }, []);

  return (
    <div>
      <h2>Hello, {firstName}! Here's your Todo List:</h2>

      <div>
        <input 
          type='text' 
          placeholder='What do you want to do?'
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />

        <input 
          type='text' 
          placeholder='Say something about this task'
          value={remarksInput}
          onChange={(e) => setRemarksInput(e.target.value)}
        />

        <input 
          type='checkbox' 
          checked={isDoneInput}
          onChange={(e) => setIsDoneInput(e.target.checked)}
        /> 
        Are you done with this task?

        {editingTodo ? (
          <button onClick={saveEdit}>Save Edit</button>
        ) : (
          <button onClick={createTodo}>Add Task</button>
        )}
      </div>

      <div>
        <h3>Your Tasks:</h3>
        <ul>
          {todos.length > 0 ? (
            todos.map(todo => (
              <li key={todo._id}>
                <strong>{todo.toDo}</strong> - {todo.remarks} - {todo.isDone ? 'Done' : 'Not Done'}
                
                <input
                  type='checkbox'
                  checked={todo.isDone}
                  onChange={(e) => 
                    updateTodo(todo._id, {
                      isDone: e.target.checked  // Only update isDone
                    })
                  }
                />
                <button onClick={() => startEdit(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No tasks found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoPage;
