import React, {useState} from 'react'
import { Col, Container, FormGroup, Input, InputGroup, Row } from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {useDispatch, useSelector} from "react-redux";
import {sendingEmail} from "../redux/Actions/ForgotPasswordActions";
import {useHistory} from 'react-router-dom'

const ForgotPassword = () => {

    const [userEmail, setUserEmail] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = (emailValue) => {
        const {email, value} = emailValue.target;
        setUserEmail({ ...userEmail, [email]: value })
    }

    const handleEmailSend = (emailValue) => {
        dispatch(sendingEmail(emailValue, history))
    }

    const userEmailID = useSelector((state) => {
        return state
    })

    return(
        <>
            <div className="form-gap" />
            <Container>
                <Row>
                    <Col md={{ size: 4, offset: 4 }}>
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="text-center">
                                    <h3><i className="fa fa-lock fa-4x"/></h3>
                                    <h2 className="text-center">Forgot Password?</h2>
                                    <p>You can reset your password here.</p>
                                    <div className="panel-body">
                                        <LocalForm model='forgot'
                                                   id="register-form"
                                                   role="form"
                                                   autoComplete="off"
                                                   className="form"
                                                   onSubmit={emailValue => handleEmailSend(emailValue)}>
                                            <FormGroup>
                                                <InputGroup>
                                                    <span className="input-group-addon">
                                                        <i className="glyphicon glyphicon-envelope color-blue" /></span>
                                                    <Control.text model='.email'
                                                                  id="email"
                                                                  type="email"
                                                                  name="email"
                                                                  placeholder="Email Address"
                                                                  className="form-control"
                                                                  onChange={handleChange}
                                                                  required
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <Input name="recover-submit"
                                                       type="submit"
                                                       className="btn btn-lg btn-primary btn-block"
                                                       value="Send Email"
                                                       disabled={userEmailID.emailID.isProcessing}
                                                >{userEmailID.emailID.isProcessing ? 'Sending..' : 'Send Email'}</Input>
                                            </FormGroup>
                                            <Input type="hidden"
                                                   className="hide"
                                                   name="token"
                                                   id="token"
                                                   value="" />
                                        </LocalForm>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ForgotPassword
