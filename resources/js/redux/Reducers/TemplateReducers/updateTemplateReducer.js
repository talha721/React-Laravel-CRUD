import * as ActionTypes from "../../ActionTypes";


const updateTemplateReducer = (state = {
    isProcessing: false,
    errMsg: null,
    success_message: ' '
}, action) => {
    switch (action.type){

        case ActionTypes.UPDATE_TEMPLATE_SUCCESS:
            return {...state, isProcessing: false, errMsg: null, success_message: action.payload}

        case ActionTypes.UPDATE_TEMPLATE_PROCESSING:
            return {...state, isProcessing: true, errMsg: null, success_message: ' '}

        case ActionTypes.UPDATE_TEMPLATE_FAILED:
            return {...state, isProcessing: false, errMsg: action.payload, success_message: ' '}

        default:
            return state
    }
}

export default updateTemplateReducer
