import fs from 'fs';
import path from 'path';
import {User} from '../models/User';

const filePath = path.join(__dirname, '../data/User.json');

export const readUsers = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(data) as User[];
    } catch {
        return [];
    }
} 

export const writeUsers = (users: User[]) => {
fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}