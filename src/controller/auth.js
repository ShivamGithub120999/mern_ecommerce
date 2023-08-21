import User from "../models/user.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import shortid from "shortid";

export default function signup(req,res){
    User.findOne({email:req.body.email})
    .exec(async(error,user) => {
        if(user) return res.status(400).json({
            message:'User already registered'
        })
    
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    const hash_password = await bcrypt.hash(password,10);
    const  _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
    username:shortid.generate() 
    }); 
    
    _user.save((error,data) => {
        if(error){
            return res.status(400).json({
                message:'Something went wrong'
            });
        }

        if(data){
            return res.status(201).json({
                message:'User Created successfully'
            })
        }
    })
 
    })
}

export function signin(req,res){
    User.findOne({email:req.body.email})
    .exec((error,user) => {
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password) && user.role === 'user'){
                const token = jwt.sign({_id : user._id, role:user.role}, process.env.JWT_SECRET,{ expiresIn : '1h'});
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user:{
                        _id, firstName, lastName, email, role, fullName
                    }
                });
            }else{
                return res.status(400).json({
                    message: "Something went wrong"
                })
            }
            
        }else{
            return res.status(400).json({message:'Something went wrong'});
        }

    });
}




