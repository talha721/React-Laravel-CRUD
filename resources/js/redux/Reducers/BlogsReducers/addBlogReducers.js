import * as ActionTypes from '../../ActionTypes'

const AddBlogsReducer = (state = {
    isProcessing: false,
    errMsg: null,
    success_message: ' '
}, action) => {
    switch (action.type){

        case ActionTypes.ADD_BLOGS_SUCCESS:
            return {...state, isProcessing: false, errMsg: null, success_message: action.payload}

        case ActionTypes.ADD_BLOGS_PROCESSING:
            return {...state, isProcessing: true, errMsg: null, success_message: ' '}

        case ActionTypes.ADD_BLOGS_FAILED:
            return {...state, isProcessing: false, errMsg: action.payload, success_message: ' '}

        default:
            return state
    }
}

export default AddBlogsReducer
