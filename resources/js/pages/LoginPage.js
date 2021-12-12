import React from "react";
import {
    Card, CardBody, CardHeader,
    Container,
    FormGroup,
    Button, Row, Col, Label, Input
} from "reactstrap";
import {Control, LocalForm} from "react-redux-form";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { postLoginData } from '../redux/Actions/loginActions';
import {Link, useHistory} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const loginData = useSelector((state) => {
        return state
    })

    const handleChange = (values) => {
        const {email, password, value} = values.target;
        setData({...data, [email]: value, [password]: value})
    }

    const handleSubmit = (values) => {
        dispatch(postLoginData(values, history))
    }

    return(
        <>
            <main className="login-form">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Card>
                                <CardHeader>Login</CardHeader>
                                <CardBody>
                                    <LocalForm model='loginpage'
                                               onSubmit={values => handleSubmit(values)}>
                                        <fieldset disabled={loginData.login.isProcessing}>
                                            <FormGroup>
                                                <Row>
                                                    <Label htmlFor="email" className="col-md-4 col-form-label">E-Mail Address</Label>
                                                    <Col md={6}>
                                                        <Control.text model='.email'
                                                                      type="text"
                                                                      id="email"
                                                                      className="form-control"
                                                                      name="email"
                                                                      onChange={handleChange}/>
                                                    </Col>
                                                </Row>
                                            </FormGroup>

                                            <FormGroup>
                                                <Row>
                                                    <Label htmlFor="password" className="col-md-4 col-form-label">Password</Label>
                                                    <Col md={6}>
                                                        <Control.text model='.password'
                                                                      type="password"
                                                                      id="password"
                                                                      className="form-control"
                                                                      name="password"
                                                                      onChange={handleChange}/>
                                                    </Col>
                                                </Row>
                                            </FormGroup>

                                            <FormGroup>
                                                <Row>
                                                    <Col md={{ size: 6, offset: 4 }}>
                                                        <div className="checkbox">
                                                            <Label>
                                                                <Input type="checkbox"
                                                                       name="remember"
                                                                       value='Remember Me'
                                                                       style={{ position: 'relative', marginTop: '0', marginLeft: '0' }}
                                                                >Remember Me</Input>
                                                            </Label>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </FormGroup>

                                            <Col md={{ size: 6, offset: 4 }}>
                                                <Button type="submit"
                                                        className="btn btn-primary"
                                                        style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                                                        disabled={loginData.login.isProcessing}>
                                                    {loginData.login.isProcessing ? 'Loging..' : 'Login'}
                                                </Button>
                                                <Link to="/forgotpassword" className="btn btn-link">
                                                    Forgot Your Password?
                                                </Link>
                                            </Col>
                                        </fieldset>
                                    </LocalForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    );
}

export default LoginPage
