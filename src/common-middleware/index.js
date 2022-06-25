import jwt from 'jsonwebtoken';

export function requireSignin(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    //jwt.decode()
  }else{
    return res.status(400).json({message: "Authorization required"});
  }
  next();
  
}

export function userMiddleware(req, res, next) {
    /* if (req.user.role !== "user") {
    return res.status(400).json({ message: "User Access denied" });
  } */
  next();
}

export function adminMiddleware(req, res, next) {
  /* if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin Access denied" });
  } */
  next();
}
