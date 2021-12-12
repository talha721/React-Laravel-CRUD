import React, {useEffect, useState} from "react";
import {Button, FormGroup, Label} from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {fetchAllTags} from "../../redux/Actions/TagsActions/showAllTagsActions";
import {updateTagData} from "../../redux/Actions/TagsActions/updateTagActions";
import DashboardLayout from "../../components/DashboardLayout";

const EditTag = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [currentData, setCurrentData] = useState({
        title: ''
    })

    const editTag = useSelector((state) => {
        return state
    })

    useEffect(() => {
        dispatch(fetchAllTags())
    }, [])

    const currentTag = editTag.showAllTags.data.find(Tag => Tag.id === parseInt(id));

    useEffect(() => {
        if (currentTag){
            setCurrentData(currentTag)
        }
    }, [currentTag])

    const handleChange = values => {
        const { title, value } = values.target;
        setCurrentData({...currentData, [title]: value})
    }

    const handleUpdate = (values) => {
        dispatch(updateTagData(values, id, history))
    }

    return(
        <>
            <DashboardLayout>
                {currentTag ? (
                    <>
                        <LocalForm model='edit-user' onSubmit={(values) => handleUpdate(values)}>
                            <h1>Edit Tag {id}</h1>
                            <fieldset disabled={editTag.updateTags.isProcessing}>
                                <FormGroup>
                                    <Label for="title">Name</Label>
                                    <Control.text model='.title'
                                                  type="text"
                                                  name="title"
                                                  id="title"
                                                  className='form-control'
                                                  defaultValue={currentTag.title}
                                                  onChange={handleChange}
                                    />
                                </FormGroup>
                                <br/>
                                <Button type='submit'
                                        className='btn btn-primary'
                                        style={{ backgroundColor: '#007bff', border: 'none' }}
                                        disabled={editTag.updateTags.isProcessing}
                                >{editTag.updateTags.isProcessing ? 'Updating..' : 'Update'}</Button>
                                <Button type='submit'
                                        className='btn btn-danger ml-3'
                                        onClick={() => { history.push('/dashboard/tagsManagement') }}
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

export default EditTag
