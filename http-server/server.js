const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like registration.html)
app.use(express.static(__dirname));

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  console.log('Registration Data:', { username, email, password });
  // Here you would normally store user data in a database
  res.send('Registration successful!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
