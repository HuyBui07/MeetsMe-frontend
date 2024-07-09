export type UserState = {
    username: string;
    accessToken: string;
}

export type RootState = {
    user: UserState
}