import * as ActionTypes from '../../ActionTypes'
import { toast } from "react-toastify";
import {addNewPageUrl} from '../../../constants/urls'

export const AddPagesSucess = (message) => {
    return{
        type: ActionTypes.ADD_PAGES_SUCCESS,
        payload: message
    }
}

export const AddPagesProcessing = () => {
    return{
        type: ActionTypes.ADD_PAGES_PROCESSING
    }
}

export const AddPagesFailed = (errMsg) => {
    return{
        type: ActionTypes.ADD_PAGES_FAILED,
        payload: errMsg
    }
}

export const postPages = (values, history) => (dispatch) => {

    dispatch(AddPagesProcessing())

    const addNewPages = {
        title: values.title
    }

    return fetch(addNewPageUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addNewPages)
    })
        .then(response => response.json())
        .then(addNew => {
            dispatch(AddPagesSucess(addNew))
            toast.success("Page Successfully Added", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/dashboard/pagesManagement')
        })
        .catch(err => {
            dispatch(AddPagesFailed(err))
            toast.error("Page Added Failed", {
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
