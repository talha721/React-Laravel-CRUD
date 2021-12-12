import * as ActionTypes from "../../ActionTypes";

export const updateLayoutSuccess = (data) => {
    return{
        type: ActionTypes.UPDATE_LAYOUT_SUCCESS,
        payload: data
    }
}

export const updateLayoutProcessing = () => {
    return{
        type: ActionTypes.UPDATE_LAYOUT_PROCESSING
    }
}

export const updateLayoutFailed = (err) => {
    return{
        type: ActionTypes.UPDATE_LAYOUT_FAILED,
        payload: err
    }
}


export const updateLayoutData = (values, id, history) => (dispatch) => {

    dispatch(updateLayoutProcessing())

    const updateLayoutData = {
        title: values.title
    }

    return fetch(`http://localhost:8000/api/admin/update/layout/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateLayoutData)
    })
        .then(response => response.json())
        .then(data => {
            dispatch(updateLayoutSuccess(data))
            history.push('/dashboard/layoutManagement')
        })
}
