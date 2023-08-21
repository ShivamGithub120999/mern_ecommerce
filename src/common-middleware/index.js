import jwt from 'jsonwebtoken';
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });

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
    if (req.user.role !== "user" && req.user.role !== "admin") {
    return res.status(400).json({ message: "User Access denied" });
  }
  next();
}

export function adminMiddleware(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin Access denied" });
  }
  next();
}
