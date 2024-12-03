// Import Express
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse POST data
app.use(express.urlencoded({ extended: true }));

// Route 1: Home page (GET request)
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

// Route 2: User page with dynamic ID (GET request)
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User Page for User ID: ${userId}`);
});

// Route 3: Contact page (GET request)
app.get('/contact', (req, res) => {
  res.send(`
    <form action="/contact" method="POST">
      <label>Name: <input type="text" name="name"></label><br>
      <label>Message: <textarea name="message"></textarea></label><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route 3 (POST request for contact form submission)
app.post('/contact', (req, res) => {
  const { name, message } = req.body;
  res.send(`Thank you, ${name}! Your message: "${message}" has been received.`);
});

// Route 4: Search page (GET request with query parameters)
app.get('/search', (req, res) => {
  const query = req.query.q;
  if (query) {
    res.send(`Search results for: ${query}`);
  } else {
    res.send('No search query provided.');
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
