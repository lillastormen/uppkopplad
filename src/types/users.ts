export type CreateUserInput = {
    username: string;
    password: string;
}

export type CreatedUser = {
    id: number;
    username: string;
}

export type GetUserParamsUsername = {
    username: string
}

export type GetUserParamsId = {
    id: Number
}