export interface IUser {
    name: string;
    email: string;
    id: string;
}

export interface IMenu {
    id : string,
    name : string,
    photoUrl : string,
    price : number,
    type : "DRINK" | "FOOD",
    composition : object
}

export type noParamReturnVoid = () => void;

export type stateOfPage = "main" | "menu" | "login" | "signup";