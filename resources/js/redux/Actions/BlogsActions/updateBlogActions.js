import * as ActionTypes from "../../ActionTypes";

export const updateBlogSuccess = (data) => {
    return{
        type: ActionTypes.UPDATE_BLOG_SUCCESS,
        payload: data
    }
}

export const updateBlogProcessing = () => {
    return{
        type: ActionTypes.UPDATE_BLOG_PROCESSING
    }
}

export const updateBlogFailed = (err) => {
    return{
        type: ActionTypes.UPDATE_BLOG_FAILED,
        payload: err
    }
}


export const updateBlogData = (values, id, history) => (dispatch) => {

    dispatch(updateBlogProcessing())

    const updateBlogData = {
        title: values.title
    }

    return fetch(`http://localhost:8000/api/admin/update/blog/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateBlogData)
    })
        .then(response => response.json())
        .then(data => {
            dispatch(updateBlogSuccess(data))
            history.push('/dashboard/blogsManagement')
        })
}
