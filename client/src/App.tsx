import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { isAuth } from "./services/authApi";
import {
  resetUserInfo,
  setIsAuth,
  setUserInfo,
} from "./store/slices/authSlice";
import { useAppDispatch } from "./store/hooks";

export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function isUserAuth(): Promise<void> {
      const res = await isAuth();
      if (res.isAuthorized && res.user) {
        dispatch(setIsAuth(true));
        dispatch(
          setUserInfo({
            userId: res.user._id,
            userName: res.user.first_name,
            userLogo: res.user.avatar,
          })
        );
      } else {
        dispatch(setIsAuth(false));
        dispatch(resetUserInfo());
      }
      setLoading(false);
    }
    isUserAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppRoutes />
    </>
  );
}
