const express = require('express');
const morgan = require('morgan');
const path = require('path');
const productsRouter = express.Router();
const app = express();
const port = process.env.PORT || 4000; // Use process.env.PORT or default to 4000

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));

// Set views directory and view engine
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

productsRouter.route("/").get((req, res)=> {
    res.send("I am products");
});

productsRouter.route("/1").get((req, res)=> {
    res.send("I am products 1");
});

app.use("/products", productsRouter);

app.get("/products");

app.get("/", (req, res) => {
    res.render('index', { username: 'phanuwat',customers: ["dawnapa","kamon","supasi"] });
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});
