import { aLOGIN_ERROR, aLOGIN_LODING, aLOGIN_SUCCESS, LOGOUT } from "./adminAction";

const ADMINDATA = JSON.parse(sessionStorage.getItem("adminAuthData"));

const initialState = {
    isAAuthenticated: sessionStorage.getItem("adminAuthenticated")|| false,
    token: "",
    admin: ADMINDATA || {} ,
    loding: false,
    error: false
}
export const AdminReducer = (store = initialState, { type, payload }) => {
    switch (type) {
        case aLOGIN_LODING: return { ...store, loding: true };

        case aLOGIN_ERROR: return { ...store, loding: false, error: true };

        case aLOGIN_SUCCESS: return { loding: false, error: false, isAAuthenticated: true, token: payload.token, admin: payload };

        case LOGOUT: return { ...initialState }
        // localStorage. removeItem('myData')

        default: return store;
    }
}