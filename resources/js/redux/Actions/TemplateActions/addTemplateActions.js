import * as ActionTypes from '../../ActionTypes'
import { toast } from "react-toastify";
import { addNewTemplateUrl } from '../../../constants/urls'

export const AddTemplatesSucess = (message) => {
    return{
        type: ActionTypes.ADD_TEMPLATES_SUCCESS,
        payload: message
    }
}

export const AddTemplatesProcessing = () => {
    return{
        type: ActionTypes.ADD_TEMPLATES_PROCESSING
    }
}

export const AddTemplatesFailed = (errMsg) => {
    return{
        type: ActionTypes.ADD_TEMPLATES_FAILED,
        payload: errMsg
    }
}

export const postTemplates = (formData, history) => (dispatch) => {

    dispatch(AddTemplatesProcessing())

    return fetch(addNewTemplateUrl, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(addNew => {
            dispatch(AddTemplatesSucess(addNew))
            toast.success("Template Successfully Added", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/dashboard/templateManagement')
        })
        .catch(err => {
            dispatch(AddTemplatesFailed(err))
            toast.error("Template Added Failed", {
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
