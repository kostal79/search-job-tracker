import { useDispatch } from "react-redux"
// import { loginUser } from "../services/authApi"
import { useNavigate } from "react-router-dom";
import { setIsAuth, setUserInfo } from "../redux/slices/authSlice";
import { useCallback } from "react";

export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logIn = useCallback(() => {
        (async function() {
            
        })()
            // .then(res => {
            //     if (!res.succsess) {
            //         navigate("/")
            //     } else {
            //         dispatch(setIsAuth(true));
            //         dispatch(setUserInfo({
            //             userId: res.user._id,
            //             userName: res.user.first_name,
            //             userLogo: res.user.avatar,
            //         }))
            //     }
            // })
            // .catch(error => {
            //     console.error(error)
            //     navigate("/")
            // })
    }, [])
    return logIn
}