const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

const readUsers = () => {
  const data = fs.readFileSync('users.json', 'utf-8');
  return JSON.parse(data);
};

const writeUsers = (users) => {
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
};


// GET all users
app.get('/new', (req, res) => {
    res.send('Hello MGH');
    console.log('Hello MGH');
  });

// GET all users
app.get('/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// POST a new user
app.post('/users', (req, res) => {
  const users = readUsers();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    ...req.body
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
});

// PUT (update) a user by ID
app.put('/users/:id', (req, res) => {
  const users = readUsers();
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    const updatedUser = { ...users[index], ...req.body };
    users[index] = updatedUser;
    writeUsers(users);
    res.json(updatedUser);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
  const users = readUsers();
  const newUsers = users.filter(u => u.id !== parseInt(req.params.id));
  if (users.length !== newUsers.length) {
    writeUsers(newUsers);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Dong nay de test pull request
