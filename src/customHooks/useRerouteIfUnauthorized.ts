import { useEffect } from "react";
import useMe from "./useMe";
import { BASE_URL } from "../routes";

export default function useRerouteIfUnauthorized (navigateFunction : (pathToGo : string) => void){
    const {user, isLoading, error} = useMe();

    useEffect(() => {
        if (!isLoading){
            console.log(`The user is ${user}`)
            console.log(`The error is ${error}`)
        }
        console.log(error)
        if (error !== null){
            navigateFunction(`${BASE_URL}/signup`);
        }
    })
}