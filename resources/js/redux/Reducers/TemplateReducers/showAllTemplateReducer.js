import * as ActionTypes from '../../ActionTypes'

const ShowTemplatesReducer = (state = [], action) => {
    switch (action.type){

        case ActionTypes.GET_ALL_TEMPLATES_SUCCESS:
            return action.payload

        default:
            return state
    }
}

export default ShowTemplatesReducer
