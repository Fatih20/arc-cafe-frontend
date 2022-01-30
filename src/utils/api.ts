import axios from 'axios';

export const BASE_URL = 'https://arc.arsaizdihar.me/api/';

export const OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

export async function register(name: string, email: string, password: string) {
  return await axios
    .post(BASE_URL + 'auth/register', { name, email, password }, OPTIONS)
    .then((res) => res.data);
}

export async function login(email: string, password: string) {
  return await axios
    .post(BASE_URL + 'auth/login', { email, password }, OPTIONS)
    .then((res) => res.data);
}

export async function logout() {
    return await axios
      .post(BASE_URL + 'auth/logout', { }, OPTIONS)
      .then((res) => res.data);
}

export async function getMenus(){
  return await axios.get(BASE_URL + '/menus/', OPTIONS).then((res) => res.data);
}

export async function addToCart(menuId : string){
  return await axios.post(BASE_URL + '/menus/cart', {menuId}, OPTIONS).then((res) => res.status);
}

export async function getItemsInCart() {
  return await axios.get(BASE_URL + '/menus/cart', OPTIONS).then((res) => res.data);
}

export async function deleteFromCart (menuId: string){
  return await axios.delete(BASE_URL + `/menus/cart/${menuId}`, OPTIONS).then((res) => res.data)
}

export async function clearCart (){
  return await axios.delete(BASE_URL + `/menus/cart/`, OPTIONS).then((res) => res.data)
}
