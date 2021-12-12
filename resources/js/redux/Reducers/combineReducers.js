import { combineReducers } from "redux";
import LoginReducer from "./loginReducer";
import AddUserReducer from "./UserReducers/addUserReducers";
import ShowUsersReducer from "./UserReducers/showUserReducer";
import updateUserReducer from "./UserReducers/updateReducer";
import ForgotPasswordReducer from "./ForgotPasswordReducer";
import AddLayoutReducer from "./LayoutReducers/addLayoutReducers";
import ShowLayoutsReducer from "./LayoutReducers/showAllLayoutsReducer";
import updateLayoutReducer from "./LayoutReducers/updateLayoutreducer";
import AddBlogsReducer from "./BlogsReducers/addBlogReducers";
import ShowBlogsReducer from "./BlogsReducers/showAllBlogsReducer";
import updateBlogReducer from "./BlogsReducers/updateBlogReducer";
import AddPagesReducer from "./PagesReducers/addPagesReducers";
import ShowPagesReducer from "./PagesReducers/showAllPagesReducer";
import updatePageReducer from "./PagesReducers/updatePageReducer";
import AddTagsReducer from "./TagsReducers/addTagsReducers";
import ShowTagsReducer from "./TagsReducers/showAllTagsReducer";
import updateTagReducer from "./TagsReducers/updateTagReducer";
import AddTemplateReducer from "./TemplateReducers/addTemplateReducer";
import ShowTemplatesReducer from "./TemplateReducers/showAllTemplateReducer";
import updateTemplateReducer from "./TemplateReducers/updateTemplateReducer";



const  rootReducers = combineReducers({
    // LOGIN REDUCERS
    login: LoginReducer,

    // USER MANAGEMENT REDUCERS
    addNewUser: AddUserReducer,
    showAllUsers: ShowUsersReducer,
    updateUser: updateUserReducer,

    // FORGOT PASSWORD REDUCERS
    emailID: ForgotPasswordReducer,

    // LAYOUTS MANAGEMENT REDUCERS
    addNewLayout: AddLayoutReducer,
    showAllLayouts: ShowLayoutsReducer,
    updateLayout: updateLayoutReducer,

    // PAGES MANAGEMENT REDUCERS
    addNewPage: AddPagesReducer,
    showAllPages: ShowPagesReducer,
    updatePages: updatePageReducer,

    // BLOGS MANAGEMENT REDUCERS
    addNewBlog: AddBlogsReducer,
    showAllBlogs: ShowBlogsReducer,
    updateBlogs: updateBlogReducer,

    // TAGS MANAGEMENT REDUCERS
    addNewTag: AddTagsReducer,
    showAllTags: ShowTagsReducer,
    updateTags: updateTagReducer,

    // TEMPLATE MANAGEMENT REDUCERS
    addNewTemplate: AddTemplateReducer,
    showAllTemplates: ShowTemplatesReducer,
    updateTemplates: updateTemplateReducer
})

export default rootReducers;
