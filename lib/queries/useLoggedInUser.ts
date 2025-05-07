import ENDPOINTS from "../endpoints";
import useFetch from "../hooks/use-fetch";
import { IUser } from "../types";

const useLoggedInUser = () => {
  const query = useFetch<IUser>({
    endpoint: ENDPOINTS.AUTH.details,
  });
  return query;
};
export default useLoggedInUser;
