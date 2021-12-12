import React, {useEffect, useState} from "react";
import { Button, Table } from "reactstrap";
import { fetchAllUsers } from '../../redux/Actions/UserActions/showUsersActions'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import DashboardLayout from "../DashboardLayout";

const UserManagement = () => {

    const [currentData, setCurrentData] = useState([]);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])

    const userData = useSelector((state) => {
        return state
    })

    useEffect(() => {
        setCurrentData(userData.showAllUsers)
    }, [ userData.showAllUsers ])

    const handleDelete = async (e, id) => {
        const confirm = window.confirm('Are You Sure?');
        if (confirm === true){
            const thisClickedDelete = e.currentTarget;
            thisClickedDelete.innerText = 'Deleting';
            const response = await axios.post(`http://localhost:8000/api/admin/delete/user/${id}`)
            thisClickedDelete.closest('tr').remove();
        }
    }

    return(
        <>
            <DashboardLayout>
                <h1>User Management</h1>
                <Button type='submit' mb={3} className='btn btn-primary mb-3' style={{ backgroundColor: '#007bff', border: 'none' }}
                        onClick={() => history.push('/dashboard/usermanagement/adduser')}>Add User</Button>
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th>Roles</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.data ? currentData.data.map((users, index) => (
                        <tr key={index}>
                            <th scope="row">{users.id}</th>
                            <td>{users.name}</td>
                            <td>{users.email}</td>
                            <td>{users.designation}</td>
                            <td>{users.role}</td>
                            <td>
                                <Link to={`/dashboard/usermanagement/editUser/${users.id}`}
                                      type='submit'
                                      className='btn btn-primary'>Edit</Link></td>
                            <td>
                                <Button type='submit'
                                        className='btn btn-danger'
                                        onClick={e => handleDelete(e, users.id)}
                                >Delete</Button>
                            </td>
                        </tr>
                    )) : 'Loading'}
                    </tbody>
                </Table>
            </DashboardLayout>
        </>
    )
}

export default UserManagement
