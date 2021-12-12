import * as ActionTypes from '../../ActionTypes'

const ShowPagesReducer = (state = [], action) => {
    switch (action.type){

        case ActionTypes.GET_ALL_PAGES_SUCCESS:
            return action.payload

        default:
            return state
    }
}

export default ShowPagesReducer
