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

module.exports = {registerUser};