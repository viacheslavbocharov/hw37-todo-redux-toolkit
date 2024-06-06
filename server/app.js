import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for users and todos (replace this with a database in a real application)
let todos = [
  // {
  //   id: 757785,
  //   done: false,
  //   text: 'Test todo'
  // }
];



// CRUD operations for todos

// Read all
app.get('/todos', (req, res) => {
  return res.status(200).json(todos);
});


// Create
app.post('/todos', (req, res) => {
  const { id } = req.body;
  const { completed } = req.body;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = {
    id,
    completed,
    text
  };
  todos.push(newTodo);
  return res.status(201).json(newTodo);
});


// Update
app.put('/todos/:id', (req, res) => {
  const { id } = req.body;
  const { completed } = req.body;
  const { text } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id == parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos[todoIndex].text = text;
  todos[todoIndex].completed = completed;
  return res.status(200).json(todos[todoIndex]);
});


// Delete
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id == parseInt(id));
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  const deletedTodo = todos.splice(todoIndex, 1);
  return res.status(200).json(deletedTodo);
});


// Clear All
app.delete('/todos', (req, res) => {
  todos = [];
  res.status(204).end();
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});