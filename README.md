# E-commerce Application

This is a full-stack e-commerce application built with Node.js, Express, PostgreSQL, and React. The application allows users to browse products, add items to their cart, and complete purchases using Stripe for payment processing.

## Project Structure

```
.env
.gitignore
config/
    db.js
controllers/
    authController.js
    cartController.js
    checkoutController.js
    orderController.js
    productController.js
    userController.js
frontend/
    .gitignore
    

package.json


    public/
        index.html
        manifest.json
        robots.txt
    README.md
    src/
        App.css
        ...
middlewares/
    authMiddleware.js


package.json




passportConfig.js






routes/
    authRoutes.js
    cartRoutes.js
    checkoutRoutes.js
    orderRoutes.js
    productRoutes.js
    userRoutes.js


server.js


```

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


## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [Express documentation](https://expressjs.com/)
- [PostgreSQL documentation](https://www.postgresql.org/docs/)
- [Stripe documentation](https://stripe.com/docs)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
```

I have created the `README.md` file in the root directory of your project.
