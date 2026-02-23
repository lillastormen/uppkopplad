import { createUser, getUserByUsername } from "../repositories/mysql/userRepository.ts";
import type { CreatedUser, GetUserParams } from "../types/users.ts";
import type { Request, Response } from "express";
import * as userService from "../services/userService.ts";



export async function getUser(req: Request<GetUserParams>, res: Response) {
    
    const {username} = req.params;
    
    try {
        const user = await getUserByUsername(username);

        if(!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error occured'
            return res.status(500).json({
                success: false,
                error: message
            });
        
    }
}

export async function createNewUser(req: Request, res: Response) {
    const { username, password } = req.body as { username?: string; password?: string };

    if (!username || ! password) {
        return res.status(400). json({
            success: false,
            error: 'Username and password required.'
        })
    }

    try {
        const newUser: CreatedUser = await userService.register(req.body);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            data: newUser
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error occured." 
            return res.status(500).json({
                success: false,
                error: message
            });
    }
}