import {Table} from "reactstrap";
import React, {useEffect, useState} from "react";
import { Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {fetchAllTags} from "../../redux/Actions/TagsActions/showAllTagsActions";
import DashboardLayout from "../../components/DashboardLayout";


const TagsTemplate = () => {

    const [currentData, setCurrentData] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllTags())
    }, [])

    const showTagData = useSelector((state) => {
        return state
    })

    useEffect(() => {
        setCurrentData(showTagData.showAllTags)
    }, [ showTagData.showAllTags ])

    const handleDelete = async (e, id) => {
        const confirm = window.confirm('Are You Sure?');
        if (confirm === true){
            const thisClickedDelete = e.currentTarget;
            thisClickedDelete.innerText = 'Deleting';
            const response = await axios.post(`http://localhost:8000/api/admin/delete/tag/${id}`)
            thisClickedDelete.closest('tr').remove();
        }
    }

    return(
        <>
            <DashboardLayout>
                <Button type='submit'
                        className='mb-3'
                        style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                        onClick={() => history.push('/dashboard/tagsManagement/addTagsTemplate')}
                >Add Tags Template</Button>
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.data ? currentData.data.map((tag, index) => (
                        <tr key={index}>
                            <th scope="row">{tag.id}</th>
                            <td>{tag.title}</td>
                            <td>
                                <Link to={`/dashboard/tagsManagement/editTag/${tag.id}`}
                                      type='submit'
                                      className='btn btn-primary'>Edit</Link></td>
                            <td>
                                <Button type='submit'
                                        className='btn btn-danger'
                                        onClick={e => handleDelete(e, tag.id)}
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

export default TagsTemplate
