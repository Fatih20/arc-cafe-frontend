import { BASE_URL } from '../routes';
import { addToCart } from './api';

export default function useDeleteFromCartIfLoggedIn(
  navigateFunction: (path: string) => void
) {
  async function deleteFromCartIfLoggedIn(menuId: string) {
    try {
      await addToCart(menuId);
    } catch (error) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
        if (message === 'Request failed with status code 401') {
          navigateFunction(`${BASE_URL}/signup/`);
        }
      }
    }
  }
  return { deleteFromCartIfLoggedIn };
}
