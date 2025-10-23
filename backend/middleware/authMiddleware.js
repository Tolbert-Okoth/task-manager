const jwt = require('jsonwebtoken');
const { User } = require('../models');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  let token;

  // 1. Check if the 'Authorization' header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the token (format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using our secret
      const decoded = jwt.verify(token, JWT_SECRET);

      // 4. Token is valid! Find the user from the token's ID
      // We attach the user to the 'req' object so our
      // controller functions can access it.
      // We exclude the password when fetching the user.
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
      });

      // 5. User is found, proceed to the next function (the controller)
      next();

    } catch (error) {
      // Token is invalid or expired
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // 6. If no token is provided at all
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = authMiddleware;