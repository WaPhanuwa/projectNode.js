const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000; // Use process.env.PORT or default to 4000

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));

// Set views directory and view engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('index', { username: 'phanuwat',customers: ["dawnapa","kamon","supasi"] });
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});
