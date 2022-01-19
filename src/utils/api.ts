import axios from 'axios';

export const BASE_URL = 'https://arc-cafe.herokuapp.com/api';

const HEADERS = {
  'Content-Type': 'application/json',
};

export async function register(name: string, email: string, password: string) {
  return await axios
    .post(
      BASE_URL + '/auth/register',
      { name, email, password },
      { headers: HEADERS }
    )
    .then((res) => res.data);
}

export async function login(email: string, password: string) {
  return await axios
    .post(BASE_URL + '/auth/login', { email, password }, { headers: HEADERS })
    .then((res) => res.data);
}
