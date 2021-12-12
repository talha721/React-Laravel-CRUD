import React, {useState} from "react";
import {Button, FormGroup, Label} from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {postPages} from "../../redux/Actions/PagesActions/addPagesActions";
import DashboardLayout from "../../components/DashboardLayout";

const AddPageTemplateForm = () => {

    const [pageData, setPageData] = useState({
        title: ''
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const addPage = useSelector((state) => {
        return state
    })

    const handleChange = (values) => {
        const { title, value } = values.target;
        setPageData({...pageData, [title]: value })
    }

    const handleSubmit = (values) => {
        dispatch(postPages(values, history))
    }

    return(
        <DashboardLayout>
            <h1>Add Your Page</h1>
            <LocalForm model='add-template' onSubmit={values => handleSubmit(values)}>
                <fieldset disabled={addPage.addNewPage.isProcessing}>
                    <FormGroup>
                        <Label for='title' className='form-label'>Title</Label>
                        <Control.text model='.title'
                                      id='title'
                                      name='title'
                                      className='form-control'
                                      onChange={handleChange}
                        />
                    </FormGroup>
                    <Button type='submit'
                            className='btn btn-primary'
                            style={{ backgroundColor: '#007bff', border: 'none' }}
                            disabled={addPage.addNewPage.isProcessing}
                    >{addPage.addNewPage.isProcessing ? 'Adding Page' : 'Add Page'}</Button>
                </fieldset>
            </LocalForm>
        </DashboardLayout>
    )
}

export default AddPageTemplateForm
