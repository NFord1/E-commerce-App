const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: 'REMOVED_API_KEY',
    clientSecret: 'REMOVED_API_KEY',
    callbackURL: 'http://localhost:5000/api/auth/google/callback',
    scope: ['profile', 'email']
},
(accessToken, refreshToken, profile, done) => {
    // create a user in the database or look up existing user
    // for now passing profile back as is
    done(null, profile);
}
));

// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) =>{
    done(null, user);
});