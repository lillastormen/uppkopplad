import { createUser } from "../repositories/mysql/userRepository.ts";
import type { CreatedUser } from "../types/users.ts";
import type { Request, Response } from "express";

export async function createNewUser(req: Request, res: Response) {
    try {
        const newUser: CreatedUser = await createUser(req.body);

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