import * as ActionTypes from '../../ActionTypes'

const ShowLayoutsReducer = (state = [], action) => {
    switch (action.type){

        case ActionTypes.GET_ALL_LAYOUTS_SUCCESS:
            return action.payload

        default:
            return state
    }
}

export default ShowLayoutsReducer
