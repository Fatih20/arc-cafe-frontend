import { getItemsInCart } from '../utils/api';
import { BASE_URL } from '../routes';
import { useQuery } from 'react-query';
import { ICartItem } from '../types';

export default function useCart(navigateFunction: (path: string) => void) {
  const { data, isLoading, error } = useQuery('cart', getItemsInCart);
  let message = 'Unknown error';
  console.log(data);
  if (error instanceof Error) {
    message = error.message;
    if (message === 'Request failed with status code 401') {
      navigateFunction(`${BASE_URL}/signup/`);
    }
  }
  return { cart: data as ICartItem[], isLoading };
}
