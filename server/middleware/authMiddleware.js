export const authMiddleware = (req, res, next) => {
  const cookieToken = req.cookies.token;
  const headerToken = req.headers.authorization?.split(' ')[1];
  const token = cookieToken || headerToken;
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};