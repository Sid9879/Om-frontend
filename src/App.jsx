import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateUser } from './store/UserSlice';
import UserProfile from './pages/UserProfile';
import CreatePost from './pages/CreatePost';
import Pesticide from './pages/Pesticide';
import Fertilizer from './pages/Fertilizer';
import Seed from './pages/Seed';
import ViewCart from './pages/ViewCart';
import ViewDetails from './pages/ViewDetails';
import GetallPost from './components/GetallPost';
import Contact from './pages/Contact';
import About from './pages/About';
import LiveLocation from './pages/LiveLocation';
import PageNotFound from './pages/PageNotFound';
import ProductDetails from './components/ProductDetails';
import Footer from './pages/Footer';
import Allpost from './pages/Allpost';

function App() {
  let dispatch = useDispatch();
  let userStore = useSelector((state) => state.user);
  let isAdmin = userStore.user.isAdmin;
  let login = userStore.login;

  const getUserDetails = async () => {
    try {
      let res = await axios.get('https://om-backend.onrender.com/users/getUser', {
        headers: {
          Authorization: userStore.token,
        },
      });
      let data = res.data;
      dispatch(updateUser(data));
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    if (userStore.token) {
      getUserDetails();
    }
  }, [userStore.token]);

  return (
    <div>
      <BrowserRouter>
        <div className='pb-[78px]'>
          <Navbar />
        </div>

        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>
              <Route path='/' element={login === true ? <Home /> : <Navigate to='/login' />} />
              <Route path='/login' element={login === false ? <Login /> : <Navigate to='/' />} />
              <Route path='/userProfile' element={login === true ? <UserProfile /> : <Navigate to='/login' />} />
              <Route path='/createPost' element={isAdmin === true ? <CreatePost /> : <Navigate to='/' />} />
              <Route path='/pesticide' element={login === true ? <Pesticide /> : <Navigate to='/login' />} />
              <Route path='/fertilizer' element={login === true ? <Fertilizer /> : <Navigate to='/login' />} />
              <Route path='/seed' element={login === true ? <Seed /> : <Navigate to='/login' />} />
              <Route path='/viewcart' element={login === true ? <ViewCart /> : <Navigate to='/login' />} />
              <Route path='/viewdetails' element={login === true ? <ViewDetails /> : <Navigate to='/login' />} />
              <Route path='/getAllpost' element={isAdmin === true ? <GetallPost /> : <Navigate to='/' />} />
              <Route path='/contact' element={login === true ? <Contact /> : <Navigate to='/login' />} />
              <Route path='/about' element={login === true ? <About /> : <Navigate to='/login' />} />
              <Route path='/location' element={<LiveLocation />} />
              <Route path='/*' element={login === true ? <PageNotFound /> : <Navigate to='/login' />} />
              <Route path='/productDetail/:id' element={login === true ? <ProductDetails /> : <Navigate to='/login' />} />
              <Route path='/products' element={login === true ? <Allpost/> : <Navigate to='/login' />} />
            </Routes>
          </main>
          <Footer />
        </div>

        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;