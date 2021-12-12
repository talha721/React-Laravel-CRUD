import * as ActionTypes from '../../ActionTypes'
import {showLayoutUrl} from "../../../constants/urls";

export const getAllLayoutsSuccess = (data) => {
    return{
        type: ActionTypes.GET_ALL_LAYOUTS_SUCCESS,
        payload: data
    }
}

export const fetchAllLayouts = () => (dispatch) => {

    return fetch(showLayoutUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => dispatch(getAllLayoutsSuccess(data)))
}
