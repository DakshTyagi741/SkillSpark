import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from './components/common/NavBar';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import LogoutPage from "./pages/LogoutPage";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from './pages/About'
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings/settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from './components/core/Dashboard/Cart/index'
import {ACCOUNT_TYPE} from './utils/constants';
import { useSelector } from "react-redux";
import AddCourse from './components/core/Dashboard/AddCourse/Index';
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/Index";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/videoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {

  const { user } = useSelector((state) => state.profile)

  return (

    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      <Routes>
        
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="catalog/:catalogName" element={<Catalog/>}></Route>
        <Route path="courses/:courseId" element={<CourseDetails/>}></Route>

        <Route path="/signup" element=
        {
          <OpenRoute>
            <Signup></Signup>
          </OpenRoute>
        }>
          
        </Route>
        <Route path="/login" element={
        <OpenRoute>
          <Login/>
        </OpenRoute>}>
        </Route>

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

          <Route path="/logout" element=
          {
            <OpenRoute>
              <LogoutPage></LogoutPage>
            </OpenRoute>
          }>

          </Route>


        <Route path="update-password/:id" element={
          <OpenRoute>
            <UpdatePassword></UpdatePassword>
          </OpenRoute>
        }>

        </Route>

        <Route path="verify-email" element={
          <OpenRoute>
            <VerifyEmail></VerifyEmail>
          </OpenRoute>
        }>

        </Route>

        <Route path="about" element=
        {
          <About></About>
        }></Route>

        <Route path="/contact" element={<Contact/>}></Route>


        <Route 
            element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
            }
            >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      <Route path="dashboard/settings" element={<Settings />} />
      


      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && 
        (
            <>
            <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}></Route>
            <Route path="dashboard/cart" element={<Cart/>}></Route>

            </>
        )
      }

      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && 
        (
            <>
            <Route path="dashboard/add-course" element={<AddCourse/>}></Route>
            <Route path="/dashboard/my-courses" element={<MyCourses/>}></Route>
            <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
            <Route path="dashboard/instructor" element={<Instructor />} />

            </>
        )
      }

    </Route>

    <Route path="" element={
    <PrivateRoute>
    <ViewCourse></ViewCourse>
    </PrivateRoute>}>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && 
        (
          <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" 
          element={<VideoDetails/> }
          >  </Route>
        )
      }


    </Route>


 
        {/* <Route path="dashboard" element={<Error/>}></Route> */}

        <Route path='*' element={<Error />} />

       

      </Routes>
    </div>
  );
}

export default App;
