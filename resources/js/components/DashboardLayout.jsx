import React from "react";
import Header from "./components/HeaderComponent";
import Sidebar from "./components/SideBarComponent";
import {Col, Row} from "reactstrap";
import LogoSection from "./components/LogoComponent";


const DashboardLayout = ({children}) => {
    return(
        <>
            <div className='home'>
                <div className='container-fluid display-table'>
                    <Row className='display-table-row'>
                        <Col md={2} sm={1} className='hidden-xs display-table-cell v-align box' id='navigation'>
                            <LogoSection/>
                            <Sidebar/>
                        </Col>
                        <Col md={10} sm={11} className='display-table-cell v-align'>
                            <Row>
                                <Header/>
                            </Row>
                            <div className='user-dashboard mt-5'>
                                <Row>
                                    <Col md={5} sm={5} xs={12} className='gutter'>
                                        <main>{children}</main>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout
