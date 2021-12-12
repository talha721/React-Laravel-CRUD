import {Table} from "reactstrap";
import React, {useEffect, useState} from "react";
import { Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {fetchAllBlogs} from "../../redux/Actions/BlogsActions/showAllBlogsActions";
import DashboardLayout from "../../components/DashboardLayout";


const BlogTemplate = () => {

    const [currentData, setCurrentData] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllBlogs())
    }, [])

    const showBlogData = useSelector((state) => {
        return state
    })

    useEffect(() => {
        setCurrentData(showBlogData.showAllBlogs)
    }, [ showBlogData.showAllBlogs ])

    const handleDelete = async (e, id) => {
        const confirm = window.confirm('Are You Sure?');
        if (confirm === true){
            const thisClickedDelete = e.currentTarget;
            thisClickedDelete.innerText = 'Deleting';
            const response = await axios.post(`http://localhost:8000/api/admin/delete/blog/${id}`)
            thisClickedDelete.closest('tr').remove();
        }
    }

    return(
        <>
            <DashboardLayout>
                <Button type='submit'
                        className='mb-3'
                        style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                        onClick={() => history.push('/dashboard/blogsManagement/addBlogTemplate')}
                >Add Blogs Template</Button>
                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.data ? currentData.data.map((blog, index) => (
                        <tr key={index}>
                            <th scope="row">{blog.id}</th>
                            <td>{blog.title}</td>
                            <td>
                                <Link to={`/dashboard/blogsManagement/editBlog/${blog.id}`}
                                      type='submit'
                                      className='btn btn-primary'>Edit</Link></td>
                            <td>
                                <Button type='submit'
                                        className='btn btn-danger'
                                        onClick={e => handleDelete(e, blog.id)}
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

export default BlogTemplate
