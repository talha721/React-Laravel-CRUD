import {Button} from "reactstrap";
import { useHistory } from 'react-router-dom'
import React from "react";
import {logoutUrl} from "../../constants/urls";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {

    const history = useHistory()

    const token = localStorage.getItem('token')

    const handleLogout = () => {
        fetch(logoutUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                localStorage.removeItem('token')
                toast.success("Logout Successful", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                history.push('/login')
            })
    }

    return(
        <>
            <Button type='submit'
                    className='btn btn-danger'
                    style={{ float: 'right' }}
                    onClick={() => handleLogout()}
            >Logout</Button>
            <ToastContainer position="top-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            style={{ width: '500px' }}/>
        </>
    )
}


export default Logout
