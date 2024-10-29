const express = require('express');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const orderRoutes = require('./routes/orderRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./passportConfig');

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'E-commerce API',
        description: 'API for an e-commerce application',
        version: '1.0.0',
        contact: {
          name: 'Nathan Ford',
          email: 'your-email@example.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./routes/*.js'], // This will include comments from your route files
  };

// Initialise swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Set up the swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Allow CORS for frontend origin
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));

app.use(session({
    secret: 'your_secret_key',// add secret key here
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false} // Set to true if using HTTPS in production
}));

// Initialise passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware to parse JSON
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

// Use product routes with /api prefix
app.use('/api', productRoutes);

//Use the user routes
app.use('/api', userRoutes);

//Use the cart routes
app.use('/api', cartRoutes);

//Use the checkout routes
app.use('/api', checkoutRoutes);

//Use the order routes
app.use('/api', orderRoutes);

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});