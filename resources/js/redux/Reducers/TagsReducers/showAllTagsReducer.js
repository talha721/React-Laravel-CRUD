import * as ActionTypes from '../../ActionTypes'

const ShowTagsReducer = (state = [], action) => {
    switch (action.type){

        case ActionTypes.GET_ALL_TAGS_SUCCESS:
            return action.payload

        default:
            return state
    }
}

export default ShowTagsReducer
