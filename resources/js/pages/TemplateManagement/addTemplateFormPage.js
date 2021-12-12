import React, {useEffect, useState} from "react";
import {Button, FormGroup, Label} from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllLayouts} from "../../redux/Actions/LayoutActions/showAllLayoutsActions";
import {fetchAllPages} from "../../redux/Actions/PagesActions/showAllPagesActions";
import {fetchAllBlogs} from "../../redux/Actions/BlogsActions/showAllBlogsActions";
import {fetchAllTags} from "../../redux/Actions/TagsActions/showAllTagsActions";
import {useHistory} from 'react-router-dom';
import {postTemplates} from "../../redux/Actions/TemplateActions/addTemplateActions";
import DashboardLayout from "../../components/DashboardLayout";

const AddTemplateForm = () => {

    const [layoutData, setLayoutData] = useState([])
    const [pageData, setPageData] = useState([])
    const [blogData, setBlogData] = useState([])
    const [tagData, setTagData] = useState([])

    const [title, setTitle] = useState()
    const [thumbnailImage, setThumbnailImage] = useState('')
    const [image, setImage] = useState('')
    const [layouts, setLayouts] = useState()
    const [pages, setPages] = useState()
    const [blogs, setBlogs] = useState()
    const [tags, setTags] = useState()

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchAllLayouts())
        dispatch(fetchAllPages())
        dispatch(fetchAllBlogs())
        dispatch(fetchAllTags())
    }, [])

    const allListing = useSelector((state) => {
        return state
    })

    useEffect(() => {
        setLayoutData( allListing.showAllLayouts )
        setPageData( allListing.showAllPages )
        setBlogData( allListing.showAllBlogs )
        setTagData( allListing.showAllTags )
    }, [ allListing.showAllLayouts, allListing.showAllPages, allListing.showAllBlogs, allListing.showAllTags ])

    const handleSubmit = async (values) => {

        const formData = new FormData();
        formData.append('title', title)
        formData.append('thumbnail', thumbnailImage)
        formData.append('image', image)
        formData.append('layouts', layouts)
        formData.append('pages', pages)
        formData.append('blogs', blogs)
        formData.append('tags', tags)

        dispatch(postTemplates(formData, history))
    }

    return(
        <>
            <DashboardLayout>
                <h1>Add Your Template</h1>
                <LocalForm model='add-template' onSubmit={values => handleSubmit(values)}>
                    <fieldset>
                        <FormGroup>
                            <Label for='title' className='form-label'>Title</Label>
                            <Control.text model='.title'
                                          id='title'
                                          name='title'
                                          className='form-control'
                                          onChange={e => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='thumbnail' className='form-label'>Thumbnail</Label>
                            <Control.file model='.thumbnail'
                                          id='thumbnail'
                                          name='thumbnail'
                                          className='form-control'
                                          accept="image/png, image/jpeg"
                                          onChange={e => setThumbnailImage(e.target.files[0])}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='image' className='form-label'>Image</Label>
                            <Control.file model='.image'
                                          id='image'
                                          name='image'
                                          className='form-control'
                                          accept="image/png, image/jpeg"
                                          onChange={e => setImage(e.target.files[0])}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='layouts' className='form-label'>Layouts</Label>
                            <Control.select model='.layouts'
                                            id='layout'
                                            name='layout'
                                            className='form-control'
                                            defaultValue=''
                                            onChange={e => setLayouts(e.target.value)}
                            >
                                <option selected>Select</option>
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
                                            defaultValue=''
                                            onChange={e => setPages(e.target.value)}
                            >
                                <option selected>Select</option>
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
                                            defaultValue=''
                                            onChange={e => setBlogs(e.target.value)}
                            >
                                <option selected>Select</option>
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
                                            defaultValue=''
                                            onChange={e => setTags(e.target.value)}
                            >
                                <option selected>Select</option>
                                {tagData.data ? tagData.data.map((t, index) => (
                                    <option key={index}>{t.title}</option>
                                )) : 'Loading..'}
                            </Control.select>
                        </FormGroup>
                        <Button type='submit'
                                className='btn btn-primary'
                                style={{ backgroundColor: '#007bff', border: 'none' }}
                        >Save Template</Button>
                    </fieldset>
                </LocalForm>
            </DashboardLayout>
        </>
    )
}

export default AddTemplateForm
