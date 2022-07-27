import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Explore from './pages/Explore'
import ForgotPassword from "./pages/ForgotPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Offers from'./pages/Offers';
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Category from "./pages/Category";
import EditListing from "./pages/EditListing";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Explore />}/>
        <Route path="/offers" element={<Offers />}/>
        <Route path='/category/:categoryName' element={<Category />} />
        <Route path="/profile" element={ <PrivateRoute /> }>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/editing-listing/:listingId" element = {<EditListing />} />
        <Route
            path='/category/:categoryName/:listingId'
            element={<Listing />}
          />
         <Route path='/contact/:landlordId' element={<Contact />} />
      </Routes>
      <NavBar />
    </Router>

    <ToastContainer/>
    
    </>
  );
}

export default App;
