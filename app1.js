const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 4000;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.send('Phabuwat');
        }
    });
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});
