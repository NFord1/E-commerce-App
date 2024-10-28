const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./config/db');

passport.use(new GoogleStrategy({
    clientID: 'REMOVED_API_KEY',
    clientSecret: 'REMOVED_API_KEY',
    callbackURL: 'http://localhost:5000/api/auth/google/callback',
    scope: ['profile', 'email']
},
async (accessToken, refreshToken, profile, done) => {
    // create a user in the database or look up existing user
    // for now passing profile back as is
    //done(null, profile);

    try {
        // Check if a user with this email already exists
        const email = profile.emails[0].value;
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            // User does not exist, create a new user with placeholder password
            return done(null, existingUser.rows[0]);
        } else {
            // User does not exist, create a new user with placeholder password
            const placeholderPassword = await bcrypt.hash('google_oauth', 10);
            const username = profile.displayName || `Google_User_${Date.now()}`;

            const newUser = await pool.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
                [username, email, placeholderPassword]
            );

            return done(null, newUser.rows[0]);
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        done(error, null);
    }
}));

// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) =>{
   try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
   } catch (error) {
    done(error, null);
   }
});