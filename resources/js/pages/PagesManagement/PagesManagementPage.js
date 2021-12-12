import {Table} from "reactstrap";
import React, {useEffect, useState} from "react";
import { Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {fetchAllPages} from "../../redux/Actions/PagesActions/showAllPagesActions";
import DashboardLayout from "../../components/DashboardLayout";


const PageTemplate = () => {

    const [currentData, setCurrentData] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllPages())
    }, [])

    const showPageData = useSelector((state) => {
        return state
    })

    useEffect(() => {
        setCurrentData(showPageData.showAllPages)
    }, [ showPageData.showAllPages ])

    const handleDelete = async (e, id) => {
        const confirm = window.confirm('Are You Sure?');
        if (confirm === true){
            const thisClickedDelete = e.currentTarget;
            thisClickedDelete.innerText = 'Deleting';
            const response = await axios.post(`http://localhost:8000/api/admin/delete/page/${id}`)
            thisClickedDelete.closest('tr').remove();
        }
    }

    return(
        <>
            <DashboardLayout>
                <Button type='submit'
                        className='mb-3'
                        style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                        onClick={() => history.push('/dashboard/pagesManagement/addPageTemplate')}
                >Add Your Pages</Button>
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.data ? currentData.data.map((page, index) => (
                        <tr key={index}>
                            <th scope="row">{page.id}</th>
                            <td>{page.title}</td>
                            <td>
                                <Link to={`/dashboard/pagesManagement/editPage/${page.id}`}
                                      type='submit'
                                      className='btn btn-primary'>Edit</Link></td>
                            <td>
                                <Button type='submit'
                                        className='btn btn-danger'
                                        onClick={e => handleDelete(e, page.id)}
                                >Delete</Button>
                            </td>
                        </tr>
                    )) : 'Loading..'}
                    </tbody>
                </Table>
            </DashboardLayout>
        </>
    )
}

export default PageTemplate
