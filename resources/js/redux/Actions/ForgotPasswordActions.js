import * as ActionTypes from '../ActionTypes'
import {forgetPasswordUrl} from "../../constants/urls";
import {toast} from "react-toastify";

export const emailSendingSuccess = (message) => {
    return{
        type: ActionTypes.EMAIL_SENDING_SUCCESS,
        payload: message
    }
}

export const emailSendingProcessing = () => {
    return{
        type: ActionTypes.EMAIL_SENDING_PROCESSING
    }
}

export const emailSendingFailed = (err) => {
    return{
        type: ActionTypes.EMAIL_SENDING_FAILED,
        payload: err
    }
}

export const sendingEmail = (emailValue, history) => (dispatch) => {

    dispatch(emailSendingProcessing())

    const emailID = {
        email: emailValue.email
    }

    return fetch(forgetPasswordUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailID)
    })
        .then(response => response.json())
        .then(data => {
            dispatch(emailSendingSuccess(data))
            history.push('/login')
            toast.success("SuccessFully Send. Check Your Email.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch(err => {
            dispatch(emailSendingFailed(err))
            toast.error("Failed. Kindly Enter Valid Email ID.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
}
