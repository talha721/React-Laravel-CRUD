import React, {useEffect, useState} from "react";
import {Button, FormGroup, Label} from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {fetchAllTemplates} from "../../redux/Actions/TemplateActions/showAllTemplateActions";
import {fetchAllLayouts} from "../../redux/Actions/LayoutActions/showAllLayoutsActions";
import {fetchAllPages} from "../../redux/Actions/PagesActions/showAllPagesActions";
import {fetchAllBlogs} from "../../redux/Actions/BlogsActions/showAllBlogsActions";
import {fetchAllTags} from "../../redux/Actions/TagsActions/showAllTagsActions";
import {updateTemplateData} from "../../redux/Actions/TemplateActions/updateTemplateActions";
import DashboardLayout from "../../components/DashboardLayout";

const EditTemplate = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [updateThumbnailImage, setUpdateThumbnailImage] = useState('')
    const [updateImage, setUpdateImage] = useState('')

    const [inputData, setInputData] = useState({
        title: '',
        layouts: '',
        pages: '',
        blogs: '',
        tags: '',
    })

    const [layoutData, setLayoutData] = useState([])
    const [pageData, setPageData] = useState([])
    const [blogData, setBlogData] = useState([])
    const [tagData, setTagData] = useState([])

    useEffect(() => {
        dispatch(fetchAllLayouts())
        dispatch(fetchAllPages())
        dispatch(fetchAllBlogs())
        dispatch(fetchAllTags())
    }, [])

    const editTemplate = useSelector((state) => {
        return state
    })

    useEffect(() => {
        setLayoutData( editTemplate.showAllLayouts )
        setPageData( editTemplate.showAllPages )
        setBlogData( editTemplate.showAllBlogs )
        setTagData( editTemplate.showAllTags )
    }, [ editTemplate.showAllLayouts, editTemplate.showAllPages, editTemplate.showAllBlogs, editTemplate.showAllTags ])

    useEffect(() => {
        dispatch(fetchAllTemplates())
    }, [])

    const currentTemplate = editTemplate.showAllTemplates.data.find(Template => Template.id === parseInt(id));

    useEffect(() => {
        if (currentTemplate){
            setInputData(currentTemplate)
        }
    }, [currentTemplate])

    const handleChange = (values) => {
        const { title, layouts, pages, blogs, tags, value } = values.target;
        setInputData({...inputData, [title]: value, [layouts]: value, [pages]: value,
            [blogs]: value, [tags]: value, })
    }

    const handleUpdate = (values) => {
        dispatch(updateTemplateData(values, history, id))
    }

    return(
        <>
            <DashboardLayout>
                {currentTemplate ? (
                    <>
                        <LocalForm model='edit-user' id='editForm' onSubmit={(values) => handleUpdate(values)}>
                            <h1>Edit Template {id}</h1>
                            <fieldset disabled={editTemplate.updateTemplates.isProcessing}>
                                <FormGroup>
                                    <Label for='title' className='form-label'>Title</Label>
                                    <Control.text model='.title'
                                                  id='title'
                                                  name='title'
                                                  className='form-control'
                                                  defaultValue={currentTemplate.title}
                                                  onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='thumbnail' className='form-label'>Thumbnail</Label>
                                    <Control.file model='.thumbnail'
                                                  id='thumbnail'
                                                  name='thumbnail'
                                                  className='form-control'
                                                  defaultValue={currentTemplate.thumbnail}
                                                  accept="image/png, image/jpeg"
                                                  onChange={e => setUpdateThumbnailImage(e.target.files[0])}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='image' className='form-label'>Image</Label>
                                    <Control.file model='.image'
                                                  id='image'
                                                  name='image'
                                                  className='form-control'
                                                  defaultValue={currentTemplate.image}
                                                  accept="image/png, image/jpeg"
                                                  onChange={e => setUpdateImage(e.target.files[0])}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='layouts' className='form-label'>Layouts</Label>
                                    <Control.select model='.layouts'
                                                    id='layout'
                                                    name='layout'
                                                    className='form-control'
                                                    defaultValue={currentTemplate.layouts}
                                                    onChange={handleChange}
                                    >
                                        <option>Select</option>
                                        {layoutData.data ? layoutData.data.map((l, index) => (
                                            <option key={index}>{l.title}</option>
                                        )) : 'Loading..'}
                                    </Control.select>

                                </FormGroup>
                                <FormGroup>
                                    <Label for='pages' className='form-label'>Pages</Label>
                                    <Control.select model='.pages'
                                                    id='page'
                                                    name='page'
                                                    className='form-control'
                                                    defaultValue={currentTemplate.pages}
                                                    onChange={handleChange}
                                    >
                                        <option>Select</option>
                                        {pageData.data ? pageData.data.map((p, index) => (
                                            <option key={index}>{p.title}</option>
                                        )) : 'Loading..'}
                                    </Control.select>
                                </FormGroup>
                                <FormGroup>
                                    <Label for='blogs' className='form-label'>Blogs</Label>
                                    <Control.select model='.blogs'
                                                    id='blog'
                                                    name='blog'
                                                    className='form-control'
                                                    defaultValue={currentTemplate.blogs}
                                                    onChange={handleChange}
                                    >
                                        <option>Select</option>
                                        {blogData.data ? blogData.data.map((b, index) => (
                                            <option key={index}>{b.title}</option>
                                        )) : 'Loading..'}
                                    </Control.select>
                                </FormGroup>
                                <FormGroup>
                                    <Label for='tags' className='form-label'>Tags</Label>
                                    <Control.select model='.tags'
                                                    id='tags'
                                                    name='tags'
                                                    className='form-control'
                                                    defaultValue={currentTemplate.tags}
                                                    onChange={handleChange}
                                    >
                                        <option>Select</option>
                                        {tagData.data ? tagData.data.map((t, index) => (
                                            <option key={index}>{t.title}</option>
                                        )) : 'Loading..'}
                                    </Control.select>
                                </FormGroup>
                                <br/>
                                <Button type='submit'
                                        className='btn btn-primary'
                                        style={{ backgroundColor: '#007bff', border: 'none' }}
                                        disabled={editTemplate.updateTemplates.isProcessing}
                                >{editTemplate.updateTemplates.isProcessing ? 'Updating..' : 'Update'}</Button>
                                <Button type='submit'
                                        className='btn btn-danger ml-3'
                                        onClick={() => { history.push('/dashboard/templateManagement') }}
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

export default EditTemplate
