
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'my-very-secret-key';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; 
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ error: 'Malformed token.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};