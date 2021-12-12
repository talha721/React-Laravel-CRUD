import * as ActionTypes from "../../ActionTypes";

export const updateTagSuccess = (data) => {
    return{
        type: ActionTypes.UPDATE_TAG_SUCCESS,
        payload: data
    }
}

export const updateTagProcessing = () => {
    return{
        type: ActionTypes.UPDATE_TAG_PROCESSING
    }
}

export const updateTagFailed = (err) => {
    return{
        type: ActionTypes.UPDATE_TAG_FAILED,
        payload: err
    }
}


export const updateTagData = (values, id, history) => (dispatch) => {

    dispatch(updateTagProcessing())

    const updateTagData = {
        title: values.title
    }

    return fetch(`http://localhost:8000/api/admin/update/tag/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTagData)
    })
        .then(response => response.json())
        .then(data => {
            dispatch(updateTagSuccess(data))
            history.push('/dashboard/tagsManagement')
        })
}
