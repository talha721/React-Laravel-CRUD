import * as ActionTypes from '../ActionTypes'

const ForgotPasswordReducer = (state = {
    isProcessing: false,
    errMsg: null,
    success_message: ''
}, action) => {
    switch (action.type) {

        case ActionTypes.EMAIL_SENDING_SUCCESS:
            return {...state, isProcessing: false, errMsg: null, success_message: action.payload}

        case ActionTypes.EMAIL_SENDING_PROCESSING:
            return {...state, isProcessing: true, errMsg: null, success_message: ''}

        case ActionTypes.EMAIL_SENDING_FAILED:
            return {...state, isProcessing: false, errMsg: action.payload, success_message: ''}

        default:
            return state
    }
}

export default ForgotPasswordReducer
