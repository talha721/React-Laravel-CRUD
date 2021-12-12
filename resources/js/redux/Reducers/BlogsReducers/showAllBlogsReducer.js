import * as ActionTypes from '../../ActionTypes'

const ShowBlogsReducer = (state = [], action) => {
    switch (action.type){

        case ActionTypes.GET_ALL_BLOGS_SUCCESS:
            return action.payload

        default:
            return state
    }
}

export default ShowBlogsReducer
