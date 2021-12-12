import * as ActionTypes from '../../ActionTypes'
import { toast } from "react-toastify";
import {addNewBlogUrl} from '../../../constants/urls'

export const AddBlogsSucess = (message) => {
    return{
        type: ActionTypes.ADD_BLOGS_SUCCESS,
        payload: message
    }
}

export const AddBlogsProcessing = () => {
    return{
        type: ActionTypes.ADD_BLOGS_PROCESSING
    }
}

export const AddBlogsFailed = (errMsg) => {
    return{
        type: ActionTypes.ADD_BLOGS_FAILED,
        payload: errMsg
    }
}

export const postBlogs = (values, history) => (dispatch) => {

    dispatch(AddBlogsProcessing())

    const addNewBlogs = {
        title: values.title
    }

    return fetch(addNewBlogUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(addNewBlogs)
    })
        .then(response => response.json())
        .then(addNew => {
            dispatch(AddBlogsSucess(addNew))
            toast.success("Succesfully Successfully Added", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/dashboard/blogsManagement')
        })
        .catch(err => {
            dispatch(AddBlogsFailed(err))
            toast.error("Blog Added Failed", {
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
