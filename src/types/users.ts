export type CreateUserInput = {
    username: string;
    password: string;
}

export type CreatedUser = {
    id: number;
    username: string;
}

export type UserCredentials = {
    id: Number;
    username: string;
    password: string;
}

export type GetUserParamsId = {
    id: Number
}