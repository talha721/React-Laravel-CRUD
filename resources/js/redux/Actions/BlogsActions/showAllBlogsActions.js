import * as ActionTypes from '../../ActionTypes'
import {showBlogUrl} from "../../../constants/urls";

export const getAllBlogsSuccess = (data) => {
    return{
        type: ActionTypes.GET_ALL_BLOGS_SUCCESS,
        payload: data
    }
}

export const fetchAllBlogs = () => (dispatch) => {

    return fetch(showBlogUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => dispatch(getAllBlogsSuccess(data)))
}
