import { useDispatch } from "react-redux"
import { logoutUser } from "../services/authApi";
import { resetUserInfo, setIsAuth } from "../redux/slices/authSlice";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = useCallback(() => {
        (async function () {
            dispatch(setIsAuth(false));
            dispatch(resetUserInfo());
            const result = await logoutUser();
            if (!result.authenticated) {
                navigate("/")
            }
        })()
    }, [])
    return  logOut;
}