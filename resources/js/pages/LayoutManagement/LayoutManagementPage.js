import {Table} from "reactstrap";
import React, {useEffect, useState} from "react";
import { Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllLayouts} from "../../redux/Actions/LayoutActions/showAllLayoutsActions";
import axios from "axios";
import DashboardLayout from "../../components/DashboardLayout";


const LayoutManagement = () => {

    const [currentData, setCurrentData] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllLayouts())
    }, [])

    const showLayoutData = useSelector((state) => {
        return state
    })

    useEffect(() => {
        setCurrentData(showLayoutData.showAllLayouts)
    }, [ showLayoutData.showAllLayouts ])

    const handleDelete = async (e, id) => {
        const confirm = window.confirm('Are You Sure?');
        if (confirm === true){
            const thisClickedDelete = e.currentTarget;
            thisClickedDelete.innerText = 'Deleting';
            const response = await axios.post(`http://localhost:8000/api/admin/delete/layout/${id}`)
            thisClickedDelete.closest('tr').remove();
        }
    }

    return(
        <>
            <DashboardLayout>
                <Button type='submit'
                        className='mb-3'
                        style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                        onClick={() => history.push('/dashboard/layoutManagement/addLayoutTemplate')}
                >Add Your Demo</Button>
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.data ? currentData.data.map((layout, index) => (
                        <tr key={index}>
                            <th scope="row">{layout.id}</th>
                            <td>{layout.title}</td>
                            <td>
                                <Link to={`/dashboard/layoutManagement/editLayout/${layout.id}`}
                                      type='submit'
                                      className='btn btn-primary'>Edit</Link></td>
                            <td>
                                <Button type='submit'
                                        className='btn btn-danger'
                                        onClick={e => handleDelete(e, layout.id)}
                                >Delete</Button>
                            </td>
                        </tr>
                    )) : 'Loading...'}
                    </tbody>
                </Table>
            </DashboardLayout>
        </>
    )
}

export default LayoutManagement
