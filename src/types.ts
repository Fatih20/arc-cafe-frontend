export interface IUser {
    name: string;
    email: string;
    id: string;
}

export type noParamReturnVoid = () => void;

export type stateOfPage = "main" | "menu" | "login" | "signup";