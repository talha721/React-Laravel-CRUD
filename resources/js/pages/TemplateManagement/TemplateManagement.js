import React, {useEffect, useState} from "react";
import {Button, Table} from "reactstrap";
import {Link} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {fetchAllTemplates} from "../../redux/Actions/TemplateActions/showAllTemplateActions";
import DashboardLayout from "../../components/DashboardLayout";

const Template = () => {

    const [currentData, setCurrentData] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllTemplates())
    }, [])

    const showTemplateData = useSelector((state) => {
        return state
    })

    useEffect(() => {
        setCurrentData(showTemplateData.showAllTemplates)
    }, [ showTemplateData.showAllTemplates ])

    const handleDelete = async (e, id) => {
        const confirm = window.confirm('Are You Sure?');
        if (confirm === true){
            const thisClickedDelete = e.currentTarget;
            thisClickedDelete.innerText = 'Deleting';
            const response = await axios.post(`http://localhost:8000/api/admin/delete/template/${id}`)
            thisClickedDelete.closest('tr').remove();
        }
    }

    return(
        <>
            <DashboardLayout>
                <Button type='submit'
                        className='mb-3'
                        style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                        onClick={() => history.push('/dashboard/templateManagement/addTemplate')}
                >Add Templates</Button>
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Template Name</th>
                        <th>Thumbnail</th>
                        <th>Full Image</th>
                        <th>Layouts</th>
                        <th>Pages</th>
                        <th>Blogs</th>
                        <th>Tags</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.data ? currentData.data.map((template, index) => (
                        <tr key={index}>
                            <th scope="row">{template.id}</th>
                            <td>{template.title}</td>
                            <td>{template.thumbnail}</td>
                            <td>{template.image}</td>
                            <td>{template.layouts}</td>
                            <td>{template.pages}</td>
                            <td>{template.blogs}</td>
                            <td>{template.tags}</td>
                            <td>
                                <Link to={`/dashboard/templateManagement/editTemplate/${template.id}`}
                                      type='submit'
                                      className='btn btn-primary'>Edit</Link></td>
                            <td>
                                <Button type='submit'
                                        className='btn btn-danger'
                                        onClick={e => handleDelete(e, template.id)}
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

export default Template
