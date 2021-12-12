import * as ActionTypes from "../../ActionTypes";

export const updatePageSuccess = (data) => {
    return{
        type: ActionTypes.UPDATE_PAGE_SUCCESS,
        payload: data
    }
}

export const updatePageProcessing = () => {
    return{
        type: ActionTypes.UPDATE_PAGE_PROCESSING
    }
}

export const updatePageFailed = (err) => {
    return{
        type: ActionTypes.UPDATE_PAGE_FAILED,
        payload: err
    }
}


export const updatePageData = (values, id, history) => (dispatch) => {

    dispatch(updatePageProcessing())

    const updatePageData = {
        title: values.title
    }

    return fetch(`http://localhost:8000/api/admin/update/page/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePageData)
    })
        .then(response => response.json())
        .then(data => {
            dispatch(updatePageSuccess(data))
            history.push('/dashboard/pagesManagement')
        })
}
