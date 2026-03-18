import bcrypt from 'bcrypt';
import { createUser, getUserCredentials } from '../repositories/mysql/userRepository.ts';
import type { CreateUserInput } from '../types/users.ts';
import type { Request, Response, NextFunction } from 'express';

//crypting password
// const SALT_ROUNDS = 12;

export async function registerUser(input: CreateUserInput) {
    
    const hashedPassword = await hashPassword(input.password);
   

    return createUser({
        username: input.username,
        password: hashedPassword
    });
}

export async function logInUser(username: string, password: string) {
    
    const user = await getUserCredentials(username);
    if(!user) return null;

    const passwordOk = await bcrypt.compare(password, user.password);
    if(!passwordOk) return null;

    return {
        id: user.id,
        username: user.username
    }
}

export function requireAuthentication(req: Request, res: Response, next: NextFunction) {

    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            error: 'Not authenticated'
        });
    }

    next();
}

export async function hashPassword(password: string): Promise<string> {
    const SALT_ROUNDS = 12;
    return bcrypt.hash(password, SALT_ROUNDS);
}