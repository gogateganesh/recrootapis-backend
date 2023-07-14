import jwt from "jsonwebtoken"

export const authentication = (req, res, next) => {
  const token = req.header("auth-token");

  // Check if token exists
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    // Verify token
    const verified = jwt.verify(token, process.env.TOKEN_KEY);

    // Add user from payload to request object
    req.user = verified;

    // Go to next middleware function
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
