import React, {useEffect, useState} from "react";
import {Button, FormGroup, Label} from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {fetchAllPages} from "../../redux/Actions/PagesActions/showAllPagesActions";
import {updatePageData} from "../../redux/Actions/PagesActions/updatePageActions";
import DashboardLayout from "../../components/DashboardLayout";

const EditPage = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const [currentData, setCurrentData] = useState({
        title: ''
    })

    const editPage = useSelector((state) => {
        return state
    })

    useEffect(() => {
        dispatch(fetchAllPages())
    }, [])

    const currentPage = editPage.showAllPages.data.find(Page => Page.id === parseInt(id));

    useEffect(() => {
        if (currentPage){
            setCurrentData(currentPage)
        }
    }, [currentPage])

    const handleChange = values => {
        const { title, value } = values.target;
        setCurrentData({...currentData, [title]: value})
    }

    const handleUpdate = (values) => {
        dispatch(updatePageData(values, id, history))
    }

    return(
        <>
            <DashboardLayout>
                {currentPage ? (
                    <>
                        <LocalForm model='edit-user' onSubmit={(values) => handleUpdate(values)}>
                            <h1>Edit Page {id}</h1>
                            <fieldset disabled={editPage.updatePages.isProcessing}>
                                <FormGroup>
                                    <Label for="title">Name</Label>
                                    <Control.text model='.title'
                                                  type="text"
                                                  name="title"
                                                  id="title"
                                                  className='form-control'
                                                  defaultValue={currentPage.title}
                                                  onChange={handleChange}
                                    />
                                </FormGroup>
                                <br/>
                                <Button type='submit'
                                        className='btn btn-primary'
                                        style={{ backgroundColor: '#007bff', border: 'none' }}
                                        disabled={editPage.updatePages.isProcessing}
                                >{editPage.updatePages.isProcessing ? 'Updating..' : 'Update'}</Button>
                                <Button type='submit'
                                        className='btn btn-danger ml-3'
                                        onClick={() => { history.push('/dashboard/PagesManagement') }}
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

export default EditPage
