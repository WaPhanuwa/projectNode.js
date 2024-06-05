const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 4000; // Use process.env.PORT or default to 4000

// ตั้งค่า EJS เป็น template engine
app.set('view engine', 'ejs');
app.set('views', './src/views'); // ตั้งค่า path สำหรับ views directory

// ใช้ morgan สำหรับ logging requests
app.use(morgan('dev'));

// ตั้งค่า static middleware เพื่อเสิร์ฟไฟล์สาธารณะ
app.use(express.static(path.join(__dirname, 'public')));

// ตั้งค่า express-session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// ใช้ middleware เพื่อ parse request body
app.use(express.urlencoded({ extended: true }));

// สร้างการเชื่อมต่อกับฐานข้อมูล
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',            // ชื่อผู้ใช้ใหม่
    password: '',            // รหัสผ่านใหม่
    database: 'onlinestore'  // ชื่อฐานข้อมูลที่ถูกต้อง
});

db.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('MySQL Connected...');
});

// Route สำหรับหน้าแรก
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('index', { products: results });
    });
});

// Route สำหรับเพิ่มสินค้าในตะกร้า
app.post('/add-to-cart', (req, res) => {
    const productId = req.body.productId;
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const cart = req.session.cart || [];
    const existingProductIndex = cart.findIndex(item => item.productId == productId);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ productId, productName, productPrice, quantity: 1 });
    }

    req.session.cart = cart;
    console.log(req.session.cart);  // แสดงข้อมูลตะกร้าสินค้าใน console
    res.redirect('/');  // เปลี่ยนเส้นทางไปที่หน้าหลัก
});

// Route สำหรับลบสินค้าออกจากตะกร้า
app.post('/remove-from-cart', (req, res) => {
    const productId = req.body.productId;
    let cart = req.session.cart || [];
    cart = cart.filter(item => item.productId != productId);

    req.session.cart = cart;
    res.redirect('/cart');
});

// Route สำหรับแสดงหน้าตะกร้าสินค้า
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    res.render('cart', { cart: cart });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
