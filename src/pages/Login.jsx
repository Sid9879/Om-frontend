import React, { Children, useRef, useState } from 'react';
import './Login.css'; // Import your styles or include them directly in a style object
import axios from 'axios'
import { toast } from 'react-toastify';
import{useDispatch} from'react-redux';
import { setState } from '../store/UserSlice';
import {useNavigate} from 'react-router-dom'


export default function Login() {
let dispatch = useDispatch();
const [isLogin, setIsLogin] = useState(true);

let navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  let nameRef = useRef();
  let emailRef = useRef();
  let addressRef = useRef();
  let passwordRef = useRef();
  let phoneRef = useRef();
 
  const handleSubmit = async (e)=>{
  e.preventDefault()
    let obj = {
    name: nameRef.current.value,
    email:emailRef.current.value,
    phoneNumber:phoneRef.current.value,
    address:addressRef.current.value,
    password:passwordRef.current.value
}

try {
    let res = await axios.post('https://om-backend.onrender.com/users/create', obj);
    

    name:nameRef.current.value=""
    email:emailRef.current.value=""
    phoneNumber:phoneRef.current.value=''
    address:addressRef.current.value=""
    password:passwordRef.current.value=""

    let data = res.data;
    let status = res.status
    if(status===201){
    toast.success(data.message,{position:"top-center"})

   }
   
  } catch (error) {
    // toast.success('User created successfully');
    // toast.error(error.response.data||'server error')
    // console.log(error.response.data||'server error')
    toast.error(error.response.data.error||'server error',{position:"top-center",theme:"dark"})
  }
  }


 // LoginPage ..................................................................................
 let loginInputRef = useRef();
 let loginpasswordRef = useRef();

 const handleLoginSubmit = async(e)=>{
  e.preventDefault();

  let obj = {
    email:loginInputRef.current.value,
    password:loginpasswordRef.current.value,
    phoneNumber:loginInputRef.current.value
  }
  

 try {
  let res = await axios.post('https://om-backend.onrender.com/users/login',obj)

  let data = res.data;
 
  let status = res.status;
  if(status===200){
    navigate('/')
    dispatch(setState(data))
    toast.success(data.msg,{position:"top-center"})

  }
 } catch (error) {
  toast.error(error.response.data.msg||'server error',{position:"top-center",theme:"dark"})
  
 }

 }

  return (
   <div className='main-div'>
     <div className="form-structor">
      {/* Sign-Up Section */}
      <div className={`signup ${!isLogin ? '' : 'slide-up'}`}>
        <h2 className="form-title" id="signup" onClick={toggleForm}>
          <span>or</span>Sign up
        </h2>
        <div className="form-holder">
          <input ref={nameRef} type="text" className="input" placeholder="Name" />
          <input ref={emailRef} type="email" className="input" placeholder="Email" />
          <input ref={phoneRef} type="number" className="input" minLength={10} maxLength={10} placeholder="Phone Number" />
          <input ref={addressRef} type="text" className="input" placeholder="Address" />
          <input ref={passwordRef} type="password" className="input" minLength={8} maxLength={20} placeholder="Password" />
        </div>
        <button onClick={handleSubmit} className="submit-btn">Sign up</button>
      </div>





      {/* Login Section */}
      <div className={`login ${isLogin ? '' : 'slide-up'}`}>
        <div className="center">
          <h2 className="form-title" id="login" onClick={toggleForm}>
            <span>or</span>Log in
          </h2>
          <div className="form-holder">
            <input ref={loginInputRef} type="text" className="input" placeholder="Email or Ph. No."/>
            <input ref={loginpasswordRef} type="password" className="input" placeholder="Password" />
          </div>
          <button onClick={handleLoginSubmit} className="submit-btn">Log in</button>
        </div>
      </div>
    </div>

   </div>
  );
}
