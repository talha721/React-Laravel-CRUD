import * as ActionTypes from '../../ActionTypes'
import {showTagUrl} from "../../../constants/urls";

export const getAllTagsSuccess = (data) => {
    return{
        type: ActionTypes.GET_ALL_TAGS_SUCCESS,
        payload: data
    }
}

export const fetchAllTags = () => (dispatch) => {

    return fetch(showTagUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => dispatch(getAllTagsSuccess(data)))
}
