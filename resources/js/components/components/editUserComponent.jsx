import React, {useEffect, useState} from "react";
import {Button, FormGroup, Label} from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {ToastContainer} from "react-toastify";
import {fetchAllUsers} from "../../redux/Actions/UserActions/showUsersActions";
import {useDispatch, useSelector} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {updateUserData} from "../../redux/Actions/UserActions/updateUserAction";
import DashboardLayout from "../DashboardLayout";

const EditUser = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [currentData, setCurrentData] = useState({
        name: '',
        email: '',
        password: '',
        designation: '',
        role: ''
    })

    const getUsers = useSelector((state) => {
        return state
    })

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])

    const currentUser = getUsers.showAllUsers.data.find(user => user.id === parseInt(id));

    useEffect(() => {
        if (currentUser){
            setCurrentData(currentUser)
        }
    }, [currentUser])

    const handleChange = values => {
        const {name, email, password, designation, role, value} = values.target;
        setCurrentData({...currentData, [name]: value, [email]: value, [password]: value, [designation]: value,
            [role]: value})
    }

    const handleUpdate = (values) => {
        dispatch(updateUserData(values, id, history))
    }

    return(
        <>
            <DashboardLayout>
                {currentUser ? (
                    <>
                        <LocalForm model='edit-user' onSubmit={(values) => handleUpdate(values)}>
                            <h1>Edit User {id}</h1>
                            <fieldset disabled={getUsers.updateUser.isProcessing}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Control.text model='.name'
                                                  type="text"
                                                  name="name"
                                                  id="name"
                                                  className='form-control'
                                                  placeholder="Name"
                                                  defaultValue={currentData.name}
                                                  onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Control.text model='.email'
                                                  type="email"
                                                  name="email"
                                                  id="email"
                                                  className='form-control'
                                                  placeholder="Email"
                                                  defaultValue={currentData.email}
                                                  onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Control.text model='.password'
                                                  type="password"
                                                  name="password"
                                                  id="password"
                                                  className='form-control'
                                                  placeholder="Password"
                                                  defaultValue={currentData.password}
                                                  onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="designation">Designation</Label>
                                    <Control.text model='.designation'
                                                  type="text"
                                                  name="designation"
                                                  id="designation"
                                                  className='form-control'
                                                  placeholder="Designation"
                                                  defaultValue={currentData.designation}
                                                  onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="roles">Select</Label>
                                    <Control.select model='.role'
                                                    id="roles"
                                                    name="roles"
                                                    type="select"
                                                    className='form-control'
                                                    onChange={handleChange}
                                    >
                                        <option value='Admin'>Admin</option>
                                        <option value='Sales'>Sales</option>
                                        <option value='Support'>Support</option>
                                    </Control.select>
                                </FormGroup>
                                <br/>
                                <Button type='submit'
                                        className='btn btn-primary'
                                        style={{ backgroundColor: '#007bff', border: 'none' }}
                                        disabled={getUsers.updateUser.isProcessing}
                                >{getUsers.updateUser.isProcessing ? 'Updating..' : 'Update'}</Button>
                                <Button type='submit'
                                        className='btn btn-danger ml-3'
                                        onClick={() => { history.push('/dashboard/usermanagement') }}
                                >Back</Button>

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
                    </>
                ) : (
                    <h1>This user {id} not exists</h1>
                )}
            </DashboardLayout>
        </>
    )
}

export default EditUser
