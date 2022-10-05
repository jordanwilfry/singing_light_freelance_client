import React from "react";

import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
// import { useContext } from "react";
// import { AuthContext } from "./context/authContext"
import Cookies from "js-cookie"

import Login from "./pages/Login/login";
import Register1 from "./pages/register/register1";
import Register2 from "./pages/register/register2";
import Register3 from "./pages/register/register3";
import Register4 from "./pages/register/register4";
import LandingPage from "./pages/landing page/landingPage";
import Home from "./pages/home/home"
import Profile from "./pages/profile/profile";
import Freelancer from "./pages/freelancer/freelancer"
import Category from "./pages/category/category";
import SubCategorie from "./pages/subCategorie/subCategorie";
import IndividualProduct from "./pages/individualProduct/individualProduct";
import Favorite from "./pages/favorite/favotire";
import PostRequest from "./pages/post_request/postRequest";
import CreateProject from "./pages/createProject/createProject";
import UpdateProfile from "./pages/updateProfile/updateProfile";
import Notfound from "./pages/NotFound/Notfound";
import EmailConfimation from "./pages/emailConfirmationPage/EmailConfimation";
import Messages from "./pages/messeges/Messages";

function  App() {
  let user = Cookies.get("SLF_id");
  let isLogIn = Cookies.get("SLF_login")
  isLogIn = isLogIn == "hfajjfjsdfnjsdf sdjfkjsdfjkja djfklasfjdkjadjfklajkl fkajsd kfkasdjfkjasdkl fjkljafjklsdf asd fadf jaksdjfkajsdfjakfk ajdfkd sjfkjasdkfjka jfkdasfk jdkjfkdsjfkjakfjdsjfk jasdfakljfklakfjkaj"
  
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Notfound />}/>
        <Route exact path="/" element={user && isLogIn ? <Home /> : <LandingPage />}/>
        <Route path="/login" element={user && isLogIn ? <Navigate to="/" /> : <Login />}/>
        <Route path="/register" element={user && isLogIn ? <Navigate to="/" /> : <Register1 />}/>
        <Route path="/register2" element={<Register2/>}/>
        <Route path="/register3" element={<Register3/>}/>
        <Route path="/registerFinal" element={<Register4/>}/>
        <Route path="/profile/:userId" element={user && isLogIn ? <Profile /> : <Navigate to ="/login"/>}/>
        <Route path="/category/:category" element={user && isLogIn ? <Category /> : <Navigate to ="/login"/>}/>
        <Route path="/SubCategory/:subCategory" element={user && isLogIn ? <SubCategorie /> : <Navigate to ="/login"/>}/>
        <Route path="/freelancer" element={user && isLogIn ? <Freelancer /> : <Navigate to ="/login"/>}/>
        <Route path="/Product/:productId" element={user && isLogIn ? <IndividualProduct /> : <Navigate to ="/login"/>}/>
        <Route path="/favorite" element={user && isLogIn ? <Favorite /> : <Navigate to ="/login"/>}/>
        <Route path="/post_request" element={user && isLogIn ? <PostRequest /> : <Navigate to ="/login"/>}/>
        <Route path="/create_project" element={user && isLogIn ? <CreateProject /> : <Navigate to ="/login"/>}/>
        <Route path="/updateProfile/:Id" element={user && isLogIn ? <UpdateProfile /> : <Navigate to ="/login"/>}/>
        <Route path="/Messenger" element={user && isLogIn ? <Messages /> : <Navigate to ="/login"/>}/>
        <Route path="/email/confirmation/:token" element={<EmailConfimation />}/>
      </Routes>
    </Router>
  );
}

export default App;