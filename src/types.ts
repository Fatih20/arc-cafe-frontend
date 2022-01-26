export interface IUser {
    name: string;
    email: string;
    id: string;
}

export interface ICartItem {
    id : string,
    customerId : string,
    createdAt : string,
    menuId : string,
    orderId : string | null,
    menu : IMenu
}

export interface IMenu {
    id : string,
    name : string,
    photoUrl : string,
    price : number,
    type : "DRINK" | "FOOD",
    composition : object
}