import bcrypt from 'bcrypt';
import { createUser } from '../repositories/mysql/userRepository.ts';
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
