import { LOGIN_ERROR, LOGIN_LODING, LOGIN_SUCCESS, LOGOUT } from "./authAction";

const USERDATA = JSON.parse(sessionStorage.getItem("userAuthData"));

const initialState = {
    isAuthenticated: sessionStorage.getItem("userAuthenticated")||false,
    token: "",
    user: USERDATA ||{},
    loding: false,
    error: false
}
export const AuthReducer = (store = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_LODING: return { ...store, loding: true };

        case LOGIN_ERROR: return { ...store, loding: false, error: true };

        case LOGIN_SUCCESS: return { loding: false, error: false, isAuthenticated: true, token: payload.token, user: payload };

        case LOGOUT: return { ...initialState }

        default: return store;
    }
}