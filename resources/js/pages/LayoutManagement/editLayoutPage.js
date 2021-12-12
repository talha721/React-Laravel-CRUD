import React, {useEffect, useState} from "react";
import {Button, FormGroup, Label} from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {fetchAllLayouts} from "../../redux/Actions/LayoutActions/showAllLayoutsActions";
import {updateLayoutData} from "../../redux/Actions/LayoutActions/updateLayoutActions";
import DashboardLayout from "../../components/DashboardLayout";

const EditLayout = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [currentData, setCurrentData] = useState({
        title: ''
    })

    const editLayout = useSelector((state) => {
        return state
    })

    useEffect(() => {
        dispatch(fetchAllLayouts())
    }, [])

    const currentLayout = editLayout.showAllLayouts.data.find(layout => layout.id === parseInt(id));

    useEffect(() => {
        if (currentLayout){
            setCurrentData(currentLayout)
        }
    }, [currentLayout])

    const handleChange = values => {
        const { title, value } = values.target;
        setCurrentData({...currentData, [title]: value})
    }

    const handleUpdate = (values) => {
        dispatch(updateLayoutData(values, id, history))
    }

    return(
        <>
            <DashboardLayout>
                {currentLayout ? (
                    <>
                        <LocalForm model='edit-user' onSubmit={(values) => handleUpdate(values)}>
                            <h1>Edit Layout {id}</h1>
                            <fieldset disabled={editLayout.updateLayout.isProcessing}>
                                <FormGroup>
                                    <Label for="title">Name</Label>
                                    <Control.text model='.title'
                                                  type="text"
                                                  name="title"
                                                  id="title"
                                                  className='form-control'
                                                  defaultValue={currentLayout.title}
                                                  onChange={handleChange}
                                    />
                                </FormGroup>
                                <br/>
                                <Button type='submit'
                                        className='btn btn-primary'
                                        style={{ backgroundColor: '#007bff', border: 'none' }}
                                        disabled={editLayout.updateLayout.isProcessing}
                                >{editLayout.updateLayout.isProcessing ? 'Updating..' : 'Update'}</Button>
                                <Button type='submit'
                                        className='btn btn-danger ml-3'
                                        onClick={() => { history.push('/dashboard/layoutManagement') }}
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

export default EditLayout
