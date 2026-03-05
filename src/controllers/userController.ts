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

    try {
        const user = await userService.loginUser(username, password);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Inloggningen misslyckades. Kontrollera dina uppgifter och försök igen.'
            })
        }

        req.session.userId = user.id;
        // console.log(`Inloggad som ${username}`);
        // console.log("Session ID:", req.sessionID);
        // console.log("Session object:", req.session);
        
        // res.redirect("/modules/mainModules.html");

        return res.status(200).json({
            success: true,
            sessionId: req.sessionID,  
            sessionUserId: req.session.userId, 
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

export async function authenticateUser(req: Request, res: Response) {
    const userId = req.session.userId;

    if(!userId) {
        return res.status(401).json({
            success: false,
            error: "Not authenticated"
        });
    }

    const user = await getUserById(userId);
    if (!user) {
        return res.status(401).json({
            success: false,
            error: "Session invalid"
        })
    }

    return res.status(200).json({
        success: true,
        data: { id: user.id, username: user.username}
    });
}

export function logoutUser(req: Request, res: Response) {
  req.session.destroy(() => {
    res.clearCookie("sid");
    res.status(200).json({ success: true });
  });
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
            error: 'No username or password entered'
        })
    }

    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            error: 'Min 8 characters.'
        })
    }

    try {
        const exsistingUser = await getUserByUsername(username);

        if(exsistingUser){
            return res.status(409).json({
                success: false,
                error: 'Användaren redan finns. Välj ett annat namn.'
            });
        }

        const newUser = await userService.registerUser({ username, password });

         //automatically log in the user
        req.session.userId = newUser.id;

        return res.status(201).json({
            success: true,
            // message: 'User registered successfully.',
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