const pool = require('../config/db');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {
    try {
        const users = await pool.query('SELECT id, username, email, created_at FROM users');
        res.status(200).json(users.rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

};


const getUserById = async (req, res) => {
    
    const { userId } = req.params;

    try {
        const user = await pool.query(
            'SELECT id, username, email, created_at FROM users WHERE id = $1',
             [userId]
            );
        if (user.rows.length === 0) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    
};


const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    try {
        // Fetch the user from the database
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
          }

        let updatedFields = [];
        if (username) {
            updatedFields.push(`username = '${username}'`);
        }
        if (email) {
            updatedFields.push(`email = '${email}'`);
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updatedFields.push(`password = '${hashedPassword}'`);
        }
        const updateQuery = `UPDATE users SET ${updatedFields.join(', ')} WHERE id = ${userId} RETURNING id, username, email`;
        const updatedUser = await pool.query(updateQuery);
       
        res.status(200).json(updatedUser.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser
};