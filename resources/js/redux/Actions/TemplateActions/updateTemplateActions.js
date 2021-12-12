import * as ActionTypes from "../../ActionTypes";

export const updateTemplateSuccess = (data) => {
    return{
        type: ActionTypes.UPDATE_TEMPLATE_SUCCESS,
        payload: data
    }
}

export const updateTemplateProcessing = () => {
    return{
        type: ActionTypes.UPDATE_TEMPLATE_PROCESSING
    }
}

export const updateTemplateFailed = (err) => {
    return{
        type: ActionTypes.UPDATE_TEMPLATE_FAILED,
        payload: err
    }
}


export const updateTemplateData = (values, history, id) => (dispatch) => {

    dispatch(updateTemplateProcessing())

    const new_data  = {
        title: values.title,
        blogs: values.blogs,
        pages: values.pages,
        tags: values.tags,
        layouts: values.layouts
    }
    return fetch(`http://localhost:8000/api/admin/update/template/${id}`, {
        method: 'POST',
        body: JSON.stringify(new_data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    })
        .then(response => response.json())
        .then(data => {
            dispatch(updateTemplateSuccess(data))
            history.push('/dashboard/templateManagement')
        })
        .catch(err => dispatch(updateTemplateFailed(err)))
}
