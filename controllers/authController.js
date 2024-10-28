const pool = require('../config/db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({message: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES( $1, $2, $3) RETURNING *', 
            [username, email, hashedPassword]);

        return res.status(201).json({
            id: newUser.rows[0].id,
            username: newUser.rows[0].username,
            email: newUser.rows[0].email,
        });


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
// User Login
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        // Check is the provided password matches the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        // If login if successful, start a user session and send a success response
        req.login(user.rows[0], (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({message: 'Login successful', userId: user.rows[0].id});

        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

const logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({message: 'Logout failed'});
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({message: 'Failed to clear session'});
            }
            res.clearCookie('connect.sid');
            res.status(200).json({message: 'Logout successful'});
        });
    });
};

module.exports = {registerUser, loginUser, logoutUser};