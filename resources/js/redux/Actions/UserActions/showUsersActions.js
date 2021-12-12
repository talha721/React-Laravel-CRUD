import * as ActionTypes from '../../ActionTypes'
import {showUserUrl} from "../../../constants/urls";

export const getAllUsersSuccess = (data) => {
    return{
        type: ActionTypes.GET_ALL_USER_SUCCESS,
        payload: data
    }
}

export const fetchAllUsers = () => (dispatch) => {

    return fetch(showUserUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => dispatch(getAllUsersSuccess(data)))
}
