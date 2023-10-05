import { logoutUser } from "../services/authApi";
import { resetUserInfo, setIsAuth } from "../redux/slices/authSlice";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";

interface LogoutReturnType {
  logOut: () => void;
}

export function useLogout():LogoutReturnType {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    (async function () {
      dispatch(setIsAuth(false));
      dispatch(resetUserInfo());
      const result = await logoutUser();
      if (!result.authenticated) {
        navigate("/");
      }
    })();
  }, []);
  return { logOut };
};
