// import { createSlice } from '@reduxjs/toolkit'

// // let details = JSON.parse(localStorage.getItem('OmAgroCenter'))

// const initialState ={
   
// }

// export const UserSlice = createSlice({
//   name: 'counter',
//   initialState:initialState,
//   reducers: {
//    setState:(state,action)=>{
//     console.log(action.payload)
// localStorage.setItem('OmAgroCenter',JSON.stringify({login:true,token:action.payload.token,user:""}))
// state.login=true;
// state.token=action.payload.token;
//    },
   
// updateUser:(state,action)=>{
//   console.log(action.payload)
// localStorage.setItem('OmAgroCenter',JSON.stringify({login:true,token:state.token,user:action.payload.user}))

//   state.user = action.payload.user
// },

// logout:(state,action)=>{
// localStorage.removeItem('OmAgroCenter');
// state.login =false;
// state.token = '';
// state.user = '';
// }

//   }
// })

// // Action creators are generated for each case reducer function
// export const { setState ,updateUser,logout} = UserSlice.actions

// export default UserSlice.reducer