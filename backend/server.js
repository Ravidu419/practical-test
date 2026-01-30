const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

let users = [
  { id: 1, name: 'Ravidu', email: 'ravidu@gmail.com' }
];

let nextUserId = 2;


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});


app.get('/api/users', (req, res) => {
  res.json(users);
});


app.post('/api/users', (req, res) => {
  const { name, email } = req.body;


  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: nextUserId++,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

//error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
    
    Server running on port ${PORT} --->
    
    `);
});
