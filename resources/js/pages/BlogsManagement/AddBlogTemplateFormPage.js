import React, {useState} from "react";
import {FormGroup, Label} from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {postBlogs} from "../../redux/Actions/BlogsActions/addBlogsActions";
import DashboardLayout from "../../components/DashboardLayout";

const AddBlogTemplateForm = () => {

    const [blogData, setBlogData] = useState({
        title: ''
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const addBlog = useSelector((state) => {
        return state
    })

    const handleChange = (values) => {
        const { title, value } = values.target;
        setBlogData({...blogData, [title]: value })
    }

    const handleSubmit = (values) => {
        dispatch(postBlogs(values, history))
    }

    return(
        <DashboardLayout>
            <h1>Add Your Blogs</h1>
            <LocalForm model='add-template' onSubmit={values => handleSubmit(values)}>
                <FormGroup>
                    <Label for='title' className='form-label'>Title</Label>
                    <Control.text model='.title'
                                  id='title'
                                  name='title'
                                  className='form-control'
                                  onChange={handleChange}
                    />
                </FormGroup>
                <Control.button model='.blogButton'
                                type='submit'
                                className='btn btn-primary'
                                style={{ backgroundColor: '#007bff', border: 'none' }}
                                disabled={addBlog.addNewBlog.isProcessing}
                >{addBlog.addNewBlog.isProcessing ? 'Adding..' : 'Add Blog'}</Control.button>
            </LocalForm>
        </DashboardLayout>
    )
}

export default AddBlogTemplateForm
