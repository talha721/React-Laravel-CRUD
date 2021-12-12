import * as ActionTypes from "../../ActionTypes";

export const updateUserSuccess = (data) => {
    return{
        type: ActionTypes.UPDATE_USER_SUCCESS,
        payload: data
    }
}

export const updateUserProcessing = () => {
    return{
        type: ActionTypes.UPDATE_USER_PROCESSING
    }
}

export const updateUserFailed = (err) => {
    return{
        type: ActionTypes.UPDATE_USER_FAILED,
        payload: err
    }
}


export const updateUserData = (values, id, history) => (dispatch) => {

    dispatch(updateUserProcessing())

    const updateUserData = {
        name: values.name,
        email: values.email,
        password: values.password,
        designation: values.designation,
        role: values.role
    }

    console.log(updateUserData)

    return fetch(`http://localhost:8000/api/admin/update/user/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUserData)
    })
        .then(response => response.json())
        .then(data => {
            dispatch(updateUserSuccess(data))
            history.push('/dashboard/usermanagement')
        })
}
