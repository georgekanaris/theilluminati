const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up EJS for templating
app.set('view engine', 'ejs');

// Serve static files (like CSS)
app.use(express.static('public'));

// Route for Home Page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle Raid Sign-Up form submission
app.post('/signup', (req, res) => {
  const { name, role, date } = req.body;

  // Read current sign-ups from file
  fs.readFile('./data/signups.json', (err, data) => {
    if (err) throw err;
    const signups = JSON.parse(data);

    // Add new sign-up to list
    signups.push({ name, role, date });

    // Save updated list back to file
    fs.writeFile('./data/signups.json', JSON.stringify(signups, null, 2), (err) => {
      if (err) throw err;
      res.send(`<h2>Thank you for signing up, ${name}!</h2><a href="/">Go back to home</a>`);
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
