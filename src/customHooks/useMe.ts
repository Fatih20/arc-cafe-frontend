import axios from 'axios';
import { useQuery } from 'react-query';
import { IUser } from '../types';
import { BASE_URL } from '../utils/api';

export default function useMe() {
  const { data, isLoading, error } = useQuery('me', () =>
    axios.get(BASE_URL + '/auth/me')
  );

  return {
    user: data as IUser | undefined,
    isLoading,
    error,
  };
}
