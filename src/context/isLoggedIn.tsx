import React, { useContext } from 'react';
import useMe from '../customHooks/useMe';

const IsLoggedInContext = React.createContext(false);

export function useIsLoggedIn() {
  return useContext(IsLoggedInContext);
}

export default function IsLoggedInProvider({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  const { user, error, isLoading } = useMe();
  console.log(isLoading);
  console.log(error);
  const isLoggedIn = !isLoading && error === null ? true : false;
  return (
    <IsLoggedInContext.Provider value={isLoggedIn}></IsLoggedInContext.Provider>
  );
}
