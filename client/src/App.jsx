import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { isAuth } from "./services/authApi";
import {
  resetUserInfo,
  setIsAuth,
  setUserInfo,
} from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function isUserAuth() {
      const res = await isAuth();
      if (res.isAuthorized) {
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

export default App;
