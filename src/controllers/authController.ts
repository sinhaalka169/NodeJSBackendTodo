import {Request, Response} from "express";
import { readUsers, writeUsers } from "../utils/userStorage";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { User } from "../models/User";



const SECRET = 'your_jwt_secret';

export const signUp = (req: Request, res: Response) => {
    const {email, password} = req.body;
    const users = readUsers();
    if(users.find(u => u.email == email)) {
        return res.status(400).json({error: 'User alrady exists'});
    }
    const hashed = bcrypt.hashSync(password, 10);
    const newUser: User = {id: Date.now().toString(), email, password:hashed};
    users.push(newUser);
    writeUsers(users);
    res.status(201).json({message: 'Signup Sucessfully'})
};

export const login = (req: Request, res: Response) => {
    const {email, password} = req.body;
    console.log(email, password)
    const users = readUsers();
    const user = users.find(u => u.email === email)
    if(!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({error: 'Invalid credentials'})
    } 

    const token = jwt.sign({id: user.id, email: user.email}, SECRET, {expiresIn: '1m'});
    res.json({token});
};
