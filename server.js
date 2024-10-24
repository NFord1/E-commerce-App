const express = require('express');
const app = express();
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// Middleware to parse JSON
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

// Use product routes with /api prefix
app.use('/api', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

/*app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});