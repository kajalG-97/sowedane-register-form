import axios from "axios";

import { userStatus } from "../status/statusAction";


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';


export const LOGIN_ERROR = 'LOGIN_ERROR';


export const LOGIN_LODING = 'LOGIN_LODING';


export const LOGOUT = 'LOGOUT';


export const loginLoding = () => ({ type: LOGIN_LODING });


export const loginError = () => ({ type: LOGIN_ERROR });


export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });


export const logoutUser = () => ({ type: LOGOUT })

export const loginSuccessData = (data, toast, navigate) => (dispatch) => {

    dispatch(loginLoding());

    axios.post("https://user-information-project.herokuapp.com/login", data).then(({ data }) => {
        dispatch(loginSuccess(data));
        console.log('data', data);


        dispatch(userStatus());


        sessionStorage.setItem("userAuthData", JSON.stringify(data));
        console.log('datghja', data);

        sessionStorage.setItem("userStatus", true);

        sessionStorage.setItem("userAuthenticated", true);

        toast.success("Logged in Successfully", {
            position: "top-center",
        });

        setTimeout(() => {
            navigate("/");
        }, 3000)
    }).catch((err) => {

        dispatch(loginError())
        toast.error("Please check your email or password", {
            position: "top-center",
        });

    });


}