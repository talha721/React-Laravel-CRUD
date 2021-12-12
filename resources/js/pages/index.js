import React from 'react';
import '../../css/app.css'
import LoginPage from "./LoginPage"
import {Provider} from "react-redux"
import ConfigureStore from '../redux/configureStore'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import UserManagement from '../components/components/UserManagementComponent'
import AddUserForm from '../components/components/AddUserFormComponent'
import Dashboard from './Dashboard'
import EditUser from "../components/components/editUserComponent"
import ForgotPassword from "./ForgotPasswordPage"
import LayoutManagement from "./LayoutManagement/LayoutManagementPage";
import AddLayoutTemplateForm from "./LayoutManagement/AddLayoutTemplateFormPage";
import PageTemplate from "./PagesManagement/PagesManagementPage";
import AddPageTemplateForm from "./PagesManagement/AddPagesTemplateFormPage";
import BlogTemplate from "./BlogsManagement/BlogManagementPage";
import AddBlogTemplateForm from "./BlogsManagement/AddBlogTemplateFormPage";
import TagsTemplate from "./TagsManagement/TagsManagementPage";
import AddTagsTemplateForm from "./TagsManagement/AddTagsTemplateFormPage";
import EditLayout from "./LayoutManagement/editLayoutPage";
import EditBlog from "./BlogsManagement/editBlogPage";
import EditPage from "./PagesManagement/editPage";
import EditTag from "./TagsManagement/editTagsPage";
import Template from "./TemplateManagement/TemplateManagement";
import AddTemplateForm from "./TemplateManagement/addTemplateFormPage";
import EditTemplate from "./TemplateManagement/editTemplatePage";

const Index = () => {

    const token = localStorage.getItem('token')
    let isLoggedIn = localStorage.setItem('token', token)

    return (
        <Provider store={ ConfigureStore }>
            <BrowserRouter>
                <Switch>
                    {/*LOGIN ROUTES*/}
                    <Route exact path='/login' component={ isLoggedIn ? Dashboard : LoginPage } />

                    {/*DASHBOARD ROUTES*/}
                    <Route exact path='/dashboard' component={ Dashboard } />

                    {/*USER MANAGEMENT ROUTES*/}
                    <Route exact path='/dashboard/usermanagement' component={ UserManagement } />
                    <Route exact path='/dashboard/usermanagement/adduser' component={ AddUserForm } />
                    <Route exact path='/dashboard/usermanagement/editUser/:id' component={ EditUser } />

                    {/*FORGOT PASSWORD ROUTES*/}
                    <Route exact path='/forgotpassword' component={ ForgotPassword } />

                    {/*LAYOUT MANAGEMENT ROUTES*/}
                    <Route exact path='/dashboard/layoutManagement' component={ LayoutManagement } />
                    <Route exact path='/dashboard/layoutManagement/addLayoutTemplate' component={ AddLayoutTemplateForm } />
                    <Route exact path='/dashboard/layoutManagement/editLayout/:id' component={ EditLayout } />

                    {/*PAGES MANAGEMENT ROUTES*/}
                    <Route exact path='/dashboard/pagesManagement' component={ PageTemplate } />
                    <Route exact path='/dashboard/pagesManagement/addPageTemplate' component={ AddPageTemplateForm } />
                    <Route exact path='/dashboard/pagesManagement/editPage/:id' component={ EditPage } />

                    {/*BLOGS MANAGEMENT ROUTES*/}
                    <Route exact path='/dashboard/blogsManagement' component={ BlogTemplate } />
                    <Route exact path='/dashboard/blogsManagement/addBlogTemplate' component={ AddBlogTemplateForm } />
                    <Route exact path='/dashboard/blogsManagement/editBlog/:id' component={ EditBlog } />

                    {/*TAGS MANAGEMENT ROUTES*/}
                    <Route exact path='/dashboard/tagsManagement' component={ TagsTemplate } />
                    <Route exact path='/dashboard/tagsManagement/addTagsTemplate' component={ AddTagsTemplateForm } />
                    <Route exact path='/dashboard/tagsManagement/editTag/:id' component={ EditTag } />

                    {/*TEMPLATE MANAGEMENT ROUTES*/}
                    <Route exact path='/dashboard/templateManagement' component={ Template } />
                    <Route exact path='/dashboard/templateManagement/addTemplate' component={ AddTemplateForm } />
                    <Route exact path='/dashboard/templateManagement/editTemplate/:id' component={ EditTemplate } />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}

export default Index;
