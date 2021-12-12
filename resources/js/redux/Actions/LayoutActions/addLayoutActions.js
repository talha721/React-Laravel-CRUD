import * as ActionTypes from '../../ActionTypes'
import { toast } from "react-toastify";
import {addNewLayoutUrl} from '../../../constants/urls'

export const AddLayoutSucess = (message) => {
    return{
        type: ActionTypes.ADD_LAYOUT_SUCCESS,
        payload: message
    }
}

export const AddLayoutProcessing = () => {
    return{
        type: ActionTypes.ADD_LAYOUT_PROCESSING
    }
}

export const AddLayoutFailed = (errMsg) => {
    return{
        type: ActionTypes.ADD_LAYOUT_FAILED,
        payload: errMsg
    }
}

export const postLayout = (values, history) => (dispatch) => {

    dispatch(AddLayoutProcessing())

    const addNewLayout = {
        title: values.title
    }

    return fetch(addNewLayoutUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addNewLayout)
    })
        .then(response => response.json())
        .then(addNew => {
            dispatch(AddLayoutSucess(addNew))
            console.log(addNew)
            toast.success("Layout Added", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/dashboard/layoutManagement')
        })
        .catch(err => {
            dispatch(AddLayoutFailed(err))
            toast.error("Layout Added Failed", {
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
