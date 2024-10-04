const jwt = require('jsonwebtoken');
const JWT_SECRET = "vraj"
const authUser = async (req, res, next) => {
  try {
    // const token = req.header('Authorization')?.replace('Bearer ', '');
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = {
  authUser,
};
