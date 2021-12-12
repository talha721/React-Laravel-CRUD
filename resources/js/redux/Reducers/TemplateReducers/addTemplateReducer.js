import * as ActionTypes from '../../ActionTypes'

const AddTemplateReducer = (state = {
    isProcessing: false,
    errMsg: null,
    success_message: ' '
}, action) => {
    switch (action.type){

        case ActionTypes.ADD_TEMPLATES_SUCCESS:
            return {...state, isProcessing: false, errMsg: null, success_message: action.payload}

        case ActionTypes.ADD_TEMPLATES_PROCESSING:
            return {...state, isProcessing: true, errMsg: null, success_message: ' '}

        case ActionTypes.ADD_TEMPLATES_FAILED:
            return {...state, isProcessing: false, errMsg: action.payload, success_message: ' '}

        default:
            return state
    }
}

export default AddTemplateReducer
