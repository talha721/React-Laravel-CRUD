import * as ActionTypes from '../../ActionTypes'
import { toast } from "react-toastify";
import {addNewUserUrl} from '../../../constants/urls'

export const AddUserSucess = (message) => {
    return{
        type: ActionTypes.ADD_USER_SUCCESS,
        payload: message
    }
}

export const AddUserProcessing = () => {
    return{
        type: ActionTypes.ADD_USER_PROCESSING
    }
}

export const AddUserFailed = (errMsg) => {
    return{
        type: ActionTypes.ADD_USER_FAILED,
        payload: errMsg
    }
}

export const postUserData = (values, history) => (dispatch) => {

    dispatch(AddUserProcessing())

    const addNewUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        designation: values.designation,
        role: values.role
    }

    return fetch(addNewUserUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addNewUser)
    })
        .then(response => response.json())
        .then(addNew => {
            dispatch(AddUserSucess(addNew))
            toast.success("User Successfully Added", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/dashboard/usermanagement')
        })
        .catch(err => {
            dispatch(AddUserFailed(err))
            toast.error("User Added Failed", {
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
