import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import api from "../api";

type UseFetchParams = {
    endpoint: string;
    id?: string;
    validate?: boolean;
    options?: AxiosRequestConfig,
    getFullResponse?: boolean;
}

const useFetch = <T>(fetchOptions?: UseFetchParams) => {
    const { endpoint = "", id, validate = false, getFullResponse = false, options } = fetchOptions || {};
    const result = useQuery({
        queryKey: [endpoint, ...(id ? [id] : [])],
        queryFn: async (): Promise<T> => {
            const res = await api.get(endpoint, { ...(options && options) });

            if (getFullResponse) {
                return res.data;
            } else {
                return res?.data?.data;
            }
        },
        enabled: validate ? Boolean(id) : true,
    });
    return result;
};

export default useFetch;
