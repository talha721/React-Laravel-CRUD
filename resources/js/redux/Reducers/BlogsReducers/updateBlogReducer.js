import * as ActionTypes from "../../ActionTypes";


const updateBlogReducer = (state = {
    isProcessing: false,
    errMsg: null,
    success_message: ' '
}, action) => {
    switch (action.type){

        case ActionTypes.UPDATE_BLOG_SUCCESS:
            return {...state, isProcessing: false, errMsg: null, success_message: action.payload}

        case ActionTypes.UPDATE_BLOG_PROCESSING:
            return {...state, isProcessing: true, errMsg: null, success_message: ' '}

        case ActionTypes.UPDATE_BLOG_FAILED:
            return {...state, isProcessing: false, errMsg: action.payload, success_message: ' '}

        default:
            return state
    }
}

export default updateBlogReducer
