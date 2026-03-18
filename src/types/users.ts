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
    id: string
}

export type UpdateUserPassword = {
    id: number,
    password?: string | undefined
}

export type UpdateUserUsername = {
    id: number,
    username?: string | undefined
}