import * as ActionTypes from '../../ActionTypes'
import {showPageUrl} from "../../../constants/urls";

export const getAllPagesSuccess = (data) => {
    return{
        type: ActionTypes.GET_ALL_PAGES_SUCCESS,
        payload: data
    }
}

export const fetchAllPages = () => (dispatch) => {

    return fetch(showPageUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => dispatch(getAllPagesSuccess(data)))
}
