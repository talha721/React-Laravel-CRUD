import React, {useState} from "react";
import {Button, FormGroup, Label} from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {postTags} from "../../redux/Actions/TagsActions/addTagsActions";
import DashboardLayout from "../../components/DashboardLayout";

const AddTagsTemplateForm = () => {

    const [tagData, setTagData] = useState({
        title: ''
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const addTag = useSelector((state) => {
        return state
    })

    const handleChange = (values) => {
        const { title, value } = values.target;
        setTagData({...tagData, [title]: value })
    }

    const handleSubmit = (values) => {
        dispatch(postTags(values, history))
    }

    return(
        <>
            <DashboardLayout>
                <h1>Add Your Tag</h1>
                <LocalForm model='add-template' onSubmit={values => handleSubmit(values)}>
                    <fieldset disabled={addTag.addNewTag.isProcessing}>
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
                                disabled={addTag.addNewTag.isProcessing}
                        >{addTag.addNewTag.isProcessing ? 'Adding Tag' : 'Add Tags'}</Button>
                    </fieldset>
                </LocalForm>
            </DashboardLayout>
        </>
    )
}

export default AddTagsTemplateForm
