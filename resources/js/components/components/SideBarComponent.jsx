import React from "react";
import {Link} from "react-router-dom";

const Sidebar = () => {
    return(
        <div className="navi">
            <ul style={{ paddingLeft: '0px' }}>
                <li><Link to="/dashboard"><i className="fa fa-home" aria-hidden="true"/><span className="hidden-xs hidden-sm">Dashboard</span></Link></li>
                <li><Link to="/dashboard/usermanagement"><i className="fa fa-tasks" aria-hidden="true"/><span className="hidden-xs hidden-sm">User Management</span></Link></li>
                <li><Link to='/dashboard/layoutManagement'><i className="fa fa-bar-chart" aria-hidden="true"/><span className="hidden-xs hidden-sm">Layouts Management</span></Link></li>
                <li><Link to="/dashboard/pagesManagement"><i className="fa fa-user" aria-hidden="true"/><span className="hidden-xs hidden-sm">Pages Management</span></Link></li>
                <li><Link to="/dashboard/blogsManagement"><i className="fa fa-calendar" aria-hidden="true"/><span className="hidden-xs hidden-sm">Blogs Management</span></Link></li>
                <li><Link to="/dashboard/tagsManagement"><i className="fa fa-cog" aria-hidden="true"/><span className="hidden-xs hidden-sm">Tags Management</span></Link></li>
                <li><Link to="/dashboard/templateManagement"><i className="fa fa-cog" aria-hidden="true"/><span className="hidden-xs hidden-sm">Template Management</span></Link></li>
            </ul>
        </div>
    )
}

export default Sidebar
