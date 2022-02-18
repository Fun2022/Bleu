export interface Account {
    identifiant?: number;
    username: string;
    email: string;
    password: string;
    token?: string;
    locked: boolean;
}

export interface RegistryAccount {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
}

export type ReturnAccountResult = {
    result: Boolean,
    token: String
}