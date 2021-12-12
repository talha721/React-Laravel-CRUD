import * as ActionTypes from '../../ActionTypes'

const ShowUsersReducer = (state = [], action) => {
    switch (action.type){

        case ActionTypes.GET_ALL_USER_SUCCESS:
            return action.payload

        default:
            return state
    }
}

export default ShowUsersReducer
