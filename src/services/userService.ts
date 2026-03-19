import bcrypt from 'bcrypt';
import { createUser, getUserById, getUserCredentials } from '../repositories/mysql/userRepository.ts';
import type { CreateUserInput } from '../types/users.ts';
import type { Request, Response, NextFunction } from 'express';
import { getUserId } from '../controllers/userController.ts';

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

export async function requireAuthentication(req: Request, res: Response, next: NextFunction) {

    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({
            success: false,
            error: 'Not authenticated'
        });
    }

    try {
        const user = await getUserById(userId);

        if (!user) {
            //if user is deleted -> kill session
            req.session.destroy(() => {
                res.clearCookie("sid");
                return res.status(401).json({
                    success: false,
                    error: 'Session invalid'
                });
            });
        }
        
        next();
    } catch {
        return res.status(500).json({
            success: false
        })
    }
}

export async function hashPassword(password: string): Promise<string> {
    const SALT_ROUNDS = 12;
    return bcrypt.hash(password, SALT_ROUNDS);
}