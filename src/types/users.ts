export type CreateUserInput = {
    username: string;
    password: string;
}

export type CreatedUser = {
    id: number;
    username: string;
}

export type UserCredentials = {
    id: number;
    username: string;
    password: string;
}

export type GetUserParamsId = {
    id: number
}

export type UpdateUserData = {
    id: number,
    username?: string | undefined,
    password?: string | undefined
}