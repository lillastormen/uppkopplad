import bcrypt from 'bcrypt';
import { createUser, getUserCredentials } from '../repositories/mysql/userRepository.ts';
import type { CreateUserInput } from '../types/users.ts';

//crypting password
const SALT_ROUNDS = 12;

export async function registerUser(input: CreateUserInput) {
    
    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

    return createUser({
        username: input.username,
        password: hashedPassword
    });
}

export async function loginUser(username: string, password: string) {
    
    const user = await getUserCredentials(username);
    if(!user) return null;

    const passwordOk = await bcrypt.compare(password, user.password);
    if(!passwordOk) return null;

    return {
        id: user.id,
        username: user.username
    }
}
