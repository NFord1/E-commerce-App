# E-commerce Application

This is a full-stack e-commerce application built with Node.js, Express, PostgreSQL, and React. It is an interactive e-commerce web application featuring a user-friendly interface and secure authentication. The platform enables users to browse products, manage their shopping cart, and complete purchases with real-time payment processing through Stripe. Authenticated users can also view their order history and access their account details. This project demonstrates the use of a RESTful API with full CRUD capabilities and is structured with clean, reusable components in React.

## Features

- User registration and login (including Google OAuth)
- Product listing and details
- Shopping cart management
- Checkout and order processing
- Admin functionalities for managing products and users
- API documentation with Swagger

## Technologies Used

### Frontend

- React
- React Router
- Fetch API
- Stripe for payments

### Backend

- Express
- PostgreSQL
- Passport for authentication
- Swagger for API documentation


## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Stripe account

### Installation

1. Clone the repository:


2. Install server dependencies:

```sh
npm install
```

3. Install frontend dependencies:

```sh
cd frontend
npm install
```

4. Set up environment variables:

Create a [`.env`](.env ) file in the root directory and add the following:

```
DB_USER=your_db_user
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=your_db_port
STRIPE_SECRET_KEY=your_stripe_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Database Setup

1. Create a PostgreSQL database
   ```
   CREATE DATABASE ecommerce;
   ```
2. Create the following tables
   ```
   -- Users Table
   CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   -- Products Table
   CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NUll,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Carts Table
   CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Cart Items Table
   CREATE TABLE cart_items (
    cart_id INT REFERENCES carts(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    PRIMARY KEY(cart_id, product_id),
   );

   -- Orders Table
   CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    total_price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Order Items Table
   CREATE TABLE order_items (
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price_at_time_of_order NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY(order_id, product_id),
   );
   ```
3. Seed the Database (Optional)
   ```
   -- Add Users
   INSERT INTO users (username, email, password) VALUES
   ('testuser', 'test@example.com', 'hashed_password');

   -- Add Products
   INSERT INTO products (name, description, price) VALUES
   ('Product 1', 'Description for product 1', 9.99),
   ('Product 2', 'Description for product 2', 19.99),
   ('Product 3', 'Description for product 3', 29.99);
   ```

### Running the Application

1. Start the server:

```sh
npm start server.js
```

2. Start the frontend:

```sh
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## API Documentation
API documentation is available at [http://localhost:5000/api-docs](http://localhost:5000/api-docs) when the backend server is running.

## Folder Structure
- `frontend/`: Contains the React frontend application.
- `backend/`: Contains the Express backend application.
- `config/`: Database configuration.
- `controllers/`: Request handlers for different routes.
- `routes/`: API route definitions.
- `middlewares/`: Custom middleware functions.
- `public/`: Static files for the frontend.
- `src/`: Source code for the frontend.

## To Do
- Style the front end using CSS.
- Complete Swagger documentation.

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Express documentation](https://expressjs.com/)
- [PostgreSQL documentation](https://www.postgresql.org/docs/)
- [Stripe documentation](https://stripe.com/docs)
- [Google OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2)

