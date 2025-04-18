import jwt from "jsonwebtoken";

const JWT_SECRET = "*ITSanAdvancedCRM$";

const fetchuser = (req, res, next) => {
  // Allow public access to login and signup routes
  if (req.path === "/api/auth/loginuser" || req.path === "/api/auth/createuser") {
    return next();
  }

  // Get token from request header
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ success: false, error: "Access Denied: No token provided" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // Attach user data (from payload) to request object
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid Token" });
  }
};

export default fetchuser;
