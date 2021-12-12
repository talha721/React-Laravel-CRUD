import * as ActionTypes from '../ActionTypes'
import { toast } from "react-toastify";
import { loginUrl } from '../../constants/urls'
import axios from "axios";

export const LoginDataSucess = (message) => {
    return{
        type: ActionTypes.LOGIN_SUCCESS,
        payload: message
    }
}

export const LoginDataProcessing = () => {
    return{
        type: ActionTypes.LOGIN_PROCESSING,
    }
}

export const LoginDataFailed = (errMsg) => {
    return{
        type: ActionTypes.LOGIN_FAILED,
        payload: errMsg
    }
}

export const postLoginData = (values, history) => (dispatch) => {

    dispatch(LoginDataProcessing())

    const logindata = {
        email: values.email,
        password: values.password
    }

    return axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(loginUrl, logindata)
            .then(res => {
                if(typeof(Storage) !== 'undefined'){
                    localStorage.setItem('token', res.data.data.token);
                }
                    dispatch(LoginDataSucess(res.data));
                    toast.success("Login Successful", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                history.push('/dashboard')
                }
            )
            .catch(err => {
                dispatch(LoginDataFailed(err))
                toast.error("Login Failed!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    })
}
