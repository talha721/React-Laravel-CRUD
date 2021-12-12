import React from "react";
import {FormGroup, Label, Button} from "reactstrap";
import { useState } from "react";
import { Control, LocalForm } from "react-redux-form";
import {useDispatch, useSelector} from "react-redux";
import {postUserData} from "../../redux/Actions/UserActions/addUserActions";
import {ToastContainer} from "react-toastify";
import {useHistory} from "react-router-dom";
import DashboardLayout from "../DashboardLayout";


const AddUserForm = () => {

    const [addUser, setAddUser] = useState({
        name: '',
        email: '',
        password: '',
        designation: '',
        role: ''
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const userData = useSelector((state) => {
        return state
    })

    const handleChange = values => {
        const {name, email, password, designation, role, value} = values.target;
        setAddUser({...addUser, [name]: value, [email]: value, [password]: value, [designation]: value, [role]: value,})
    }

    const handleSubmit = (values) => {
        dispatch(postUserData(values, history))
    }

    return(
        <>
            <DashboardLayout>
                <LocalForm model='add-user' onSubmit={values => handleSubmit(values)}>
                    <h1>Add User</h1>
                    <fieldset disabled={userData.addNewUser.isProcessing}>
                        <FormGroup>
                            <Label for="name" className="form-label">Name</Label>
                            <Control.text model='.name'
                                          type="text"
                                          name="name"
                                          className='form-control'
                                          id="name"
                                          placeholder="Name"
                                          onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" className="form-label">Email</Label>
                            <Control.text model='.email'
                                          type="email"
                                          name="email"
                                          className='form-control'
                                          id="email"
                                          placeholder="Email"
                                          onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" className="form-label">Password</Label>
                            <Control.text model='.password'
                                          type="password"
                                          name="password"
                                          className='form-control'
                                          id="password"
                                          placeholder="Password"
                                          onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="designation" className="form-label">Designation</Label>
                            <Control.text model='.designation'
                                          type="text"
                                          name="designation"
                                          className='form-control'
                                          id="designation"
                                          placeholder="Designation"
                                          onChange={handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="roles" className="form-label">Select</Label>
                            <Control.select model='.role'
                                            id="roles"
                                            name="roles"
                                            type="select"
                                            className='form-control'
                                            onChange={handleChange}>
                                <option selected>Select Your Role</option>
                                <option value='Admin'>Admin</option>
                                <option value='Sales'>Sales</option>
                                <option value='Support'>Support</option>
                            </Control.select>
                        </FormGroup>
                        <br/>
                        <Button type='submit'
                                className='btn btn-primary mb-3'
                                disabled={userData.addNewUser.isProcessing}
                                style={{ backgroundColor: '#007bff', border: 'none' }}
                        >Add User</Button>

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
                    </fieldset>
                </LocalForm>
            </DashboardLayout>
        </>
    )
}

export default AddUserForm
