

// Middleware to check if a user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { // Check if user is logged in
        return next();
    } else {
        return res.status(401).json({message: 'Unathorizes: Please log in'});
    }
};

module.exports = ensureAuthenticated;