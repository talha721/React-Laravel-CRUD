import * as ActionTypes from '../../ActionTypes'
import { toast } from "react-toastify";
import {addNewTagUrl} from '../../../constants/urls'

export const AddTagsSucess = (message) => {
    return{
        type: ActionTypes.ADD_TAGS_SUCCESS,
        payload: message
    }
}

export const AddTagsProcessing = () => {
    return{
        type: ActionTypes.ADD_TAGS_PROCESSING
    }
}

export const AddTagsFailed = (errMsg) => {
    return{
        type: ActionTypes.ADD_TAGS_FAILED,
        payload: errMsg
    }
}

export const postTags = (values, history) => (dispatch) => {

    dispatch(AddTagsProcessing())

    const addNewTags = {
        title: values.title
    }

    return fetch(addNewTagUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addNewTags)
    })
        .then(response => response.json())
        .then(addNew => {
            dispatch(AddTagsSucess(addNew))
            toast.success("Tag Successfully Added", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/dashboard/tagsManagement')
        })
        .catch(err => {
            dispatch(AddTagsFailed(err))
            toast.error("Tag Added Failed", {
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
