import React, {useEffect, useState} from "react";
import {Button, FormGroup, Label} from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {fetchAllBlogs} from "../../redux/Actions/BlogsActions/showAllBlogsActions";
import {updateBlogData} from "../../redux/Actions/BlogsActions/updateBlogActions";
import DashboardLayout from "../../components/DashboardLayout";

const EditBlog = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [currentData, setCurrentData] = useState({
        title: ''
    })

    const editBlog = useSelector((state) => {
        return state
    })

    useEffect(() => {
        dispatch(fetchAllBlogs())
    }, [])

    const currentBlog = editBlog.showAllBlogs.data.find(blog => blog.id === parseInt(id));

    useEffect(() => {
        if (currentBlog){
            setCurrentData(currentBlog)
        }
    }, [currentBlog])

    const handleChange = values => {
        const { title, value } = values.target;
        setCurrentData({...currentData, [title]: value})
    }

    const handleUpdate = (values) => {
        dispatch(updateBlogData(values, id, history))
    }

    return(
        <>
            <DashboardLayout>
                {currentBlog ? (
                    <>
                        <LocalForm model='edit-user' onSubmit={(values) => handleUpdate(values)}>
                            <h1>Edit Blog {id}</h1>
                            <fieldset disabled={editBlog.updateBlogs.isProcessing}>
                                <FormGroup>
                                    <Label for="title">Name</Label>
                                    <Control.text model='.title'
                                                  type="text"
                                                  name="title"
                                                  id="title"
                                                  className='form-control'
                                                  defaultValue={currentBlog.title}
                                                  onChange={handleChange}
                                    />
                                </FormGroup>
                                <br/>
                                <Button type='submit'
                                        className='btn btn-primary'
                                        style={{ backgroundColor: '#007bff', border: 'none' }}
                                        disabled={editBlog.updateBlogs.isProcessing}
                                >{editBlog.updateBlogs.isProcessing ? 'Updating..' : 'Update'}</Button>
                                <Button type='submit'
                                        className='btn btn-danger ml-3'
                                        onClick={() => { history.push('/dashboard/blogsManagement') }}
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
                    <h1>This {id} not exists</h1>
                )}
            </DashboardLayout>
        </>
    )
}

export default EditBlog
