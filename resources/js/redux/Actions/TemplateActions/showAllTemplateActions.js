import * as ActionTypes from '../../ActionTypes'
import {showTemplateUrl} from "../../../constants/urls";

export const getAllTemplatesSuccess = (data) => {
    return{
        type: ActionTypes.GET_ALL_TEMPLATES_SUCCESS,
        payload: data
    }
}

export const fetchAllTemplates = () => (dispatch) => {

    return fetch(showTemplateUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => dispatch(getAllTemplatesSuccess(data)))
}
