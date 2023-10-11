import { logoutUser } from "../services/authApi";
import { resetUserInfo, setIsAuth } from "../store/slices/authSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";


export function useLogout(): () => void {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut: () => void = useCallback(() => {
    async function getOut() {
      dispatch(setIsAuth(false));
      dispatch(resetUserInfo());
      const result = await logoutUser();
      if (!result.authenticated) {
        navigate("/");
      }
    };
    return getOut()
  }, []);
  return logOut ;
}
