import { useEffect } from "react";
import useMe from "./useMe";
import { BASE_URL } from "../routes";
import { useNavigate } from "react-router-dom";

export default function useRerouteIfUnauthorized (){
    const {user, isLoading, error} = useMe();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading){
            console.log(`The user is ${user}`)
            console.log(`The error is ${error}`)
        }
        console.log(error)
        if (error !== null){
            navigate(`${BASE_URL}/signup`);
        }
    })
}