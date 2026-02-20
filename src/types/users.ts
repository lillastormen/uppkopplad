export type CreateUserInput = {
    username: string;
    password: string;
}

export type CreatedUser = {
    id: number;
    username: string;
}

export type GetUserParams = {
    username: string
}