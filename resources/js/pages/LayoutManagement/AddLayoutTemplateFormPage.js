import React, {useState} from "react";
import { FormGroup, Label } from "reactstrap";
import {Control, LocalForm, Errors} from "react-redux-form";
import {useDispatch, useSelector} from "react-redux";
import {postLayout} from "../../redux/Actions/LayoutActions/addLayoutActions";
import { useHistory } from 'react-router-dom';
import DashboardLayout from "../../components/DashboardLayout";


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const AddLayoutTemplateForm = () => {

    const [layoutData, setLayoutData] = useState({
        title: ''
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const addLayout = useSelector((state) => {
        return state
    })

    const handleChange = (values) => {
        const { title, value } = values.target;
        setLayoutData({...layoutData, [title]: value })
    }

    const handleSubmit = (values) => {
        dispatch(postLayout(values, history))
    }

    return(
        <DashboardLayout>
            <h1>Add Your Layout</h1>
            <LocalForm model='add-template' onSubmit={values => handleSubmit(values)}>
                <fieldset disabled={addLayout.addNewLayout.isProcessing}>
                    <FormGroup>
                        <Label for='title' className='form-label'>Title</Label>
                        <Control.text model='.title'
                                      id='title'
                                      name='title'
                                      className='form-control'
                                      onChange={handleChange}
                                      validators={{
                                          required,
                                          maxLength: maxLength(15),
                                          minLength: minLength(3)
                                      }}
                        />
                        <Errors
                            className="text-danger"
                            model=".title"
                            show="touched"
                            messages={{
                                required: 'Required! ',
                                minLength: 'Must Be Greater Than 2 Characters',
                                maxLength: 'Must Be 15 Characters Or Less'
                            }}
                        />
                    </FormGroup>
                    <Control.button model='.layoutButton'
                                    type='submit'
                                    className='btn btn-primary'
                                    style={{ backgroundColor: '#007bff', border: 'none' }}
                                    disabled={addLayout.addNewLayout.isProcessing}
                    >{addLayout.addNewLayout.isProcessing ? 'Adding..' : 'Add Demo'}</Control.button>
                </fieldset>
            </LocalForm>
        </DashboardLayout>
    )
}

export default AddLayoutTemplateForm
