import React from "react";
import Logo from '../../../images/DashboarLogo1.png';
import { Link } from 'react-router-dom';

const LogoSection = () => {
    return(
        <div className="logo">
            <Link to="/dashboard">
                <img src={Logo} alt="merkery_logo" className="mt-5 mb-3"/>
            </Link>
        </div>
    )
}

export default LogoSection
