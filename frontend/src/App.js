import {Routes, Route, BrowserRouter} from "react-router-dom";

import AddClass from "./pages/admin/AddClass";
import AddCourse from "./pages/admin/AddCourse";
import AdminHome from "./pages/admin/AdminHome";
import AdminLogin from "./pages/admin/AdminLogin";
import BookedClass from "./pages/admin/BookedClass";
import CalssPage from "./pages/admin/CalssPage";
import Course from "./pages/admin/Course";
import EditClass from "./pages/admin/EditClass";
import EditCourse from "./pages/admin/EditCourse";
import Authentication from "./pages/User/Authentication";
import UserHome from "./pages/User/UserHome";
import UserLogin from "./pages/User/UserLogin";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/admin" element={<AdminLogin/>}/>
    <Route path="/admin/home" element={<AdminHome/>}/>
    <Route path="/admin/course" element = {<Course />}/>
    <Route path="/admin/add-course" element = {<AddCourse/>}/>
    <Route path="/admin/edit-course" element = {<EditCourse/>}/>
    <Route path="/admin/class" element = {<CalssPage/>}/>
    <Route path="/admin/add-class" element ={<AddClass/>}/>
    <Route path="/admin/edit-class" element ={<EditClass/>}/>
    <Route path ='/admin/book-class' element = {<BookedClass/>}/>
    
    <Route path='/authentication' element= {<Authentication/>}/>
    <Route path= '/' element= {<UserLogin/>}/>
    <Route path= "/home" element= {<UserHome/>}/>
    </Routes>
    </BrowserRouter>    
    </div>
  );
}

export default App;
