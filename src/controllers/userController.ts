import { createUser, getUserByUsername, getUserById, getAllUsers, getUserCredentials } from "../repositories/mysql/userRepository.ts";
import type { CreatedUser, GetUserParamsId, UserCredentials } from "../types/users.ts";
import type { Request, Response } from "express";
import * as userService from "../services/userService.ts";




export async function getUser(req: Request<CreatedUser>, res: Response) {
    const { username } = req.params;
    
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

export async function getUserId(req: Request<GetUserParamsId>, res: Response) {
    const { id } = req.params;

    try {
        const userId = await getUserById(id);

        if(!userId) {
            return res.status(404).json({
                success: false,
                error: 'User Id not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: userId
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error occured." 
            return res.status(500).json({
                success: false,
                error: message
            });
    }
}

export async function loginUser(req: Request, res: Response) {
    const { username, password } = req.body as { username?: string, password?: string };

     if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Username and password missing'
            })
    }
         const user = await userService.loginUser(username, password);

    try {
        // const user = await userService.loginUser(username, password);
     
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            })
        }
       
        return res.status(200).json({
            success: true,
            data: user
        })

        
    
    } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error occured." 
        return res.status(500).json({
            success: false,
            error: message
        });
    }
}


export async function getUsers(req: Request, res: Response) {
    try {
        const users = await getAllUsers();

        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error occured." 
            return res.status(500).json({
                success: false,
                error: message
            });
    }
}

export async function createNewUser(req: Request, res: Response) {
    const { username, password } = req.body as { username?: string; password?: string };

    if (!username || !password) {
        return res.status(400). json({
            success: false,
            error: 'Användarnamn och lösenord saknas.'
        })
    }

    try {
        const exsistingUser = await getUserByUsername(username);

        if(exsistingUser){
            return res.status(409).json({
                success: false,
                error: 'Användarnamn redan finns, väjl ett annat namn.'
            });
        }

        const newUser = await userService.registerUser({ username, password });

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