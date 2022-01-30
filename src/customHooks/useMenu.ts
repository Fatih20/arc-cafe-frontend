import axios from "axios";
import { BASE_URL } from "../utils/api";

import { getMenus } from "../utils/api";
import { useQuery } from "react-query";
import { IMenu } from "../types";

export default function useMenu () {
    const { data, isLoading, error } = useQuery('menu', getMenus);

    return {
        menu : data as IMenu[],
        isLoading,
        error
    }
}