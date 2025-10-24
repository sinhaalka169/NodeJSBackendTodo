import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

const SECRET = 'your_jwt_secret';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token, SECRET)
    if(!token) return res.status(401).json({error: 'no token provided'});

    try {
        console.log(token, SECRET)
        const decode = jwt.verify(token, SECRET);
        (req as any).user = decode;
        next();
    } catch {
        res.status(401).json({error: 'invalid token'})
    }
}