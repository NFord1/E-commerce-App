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

1. Create a PostgreSQL database and run the necessary migrations to set up the schema.

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

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Express documentation](https://expressjs.com/)
- [PostgreSQL documentation](https://www.postgresql.org/docs/)
- [Stripe documentation](https://stripe.com/docs)
- [Google OAuth 2.0 documentation](https://developers.google.com/identity/protocols/oauth2)

