import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import GetallPost from '../components/GetallPost';
const CreatePost = () => {
    let userStore = useSelector((state)=>state.user)
    const [post, setpost] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formDetails, setformDetails] = useState({
      title: "",
      description :"",
      price:"",
      category:"",
      size:'',
      image:[]
    });
    const handleCreatePostClick = ()=>{
      setpost(true)
    }
    
    const handleCancelClick = ()=>{
      setpost(false)
    }
    const handleInputChanger = (e)=>{
      let value = e.target.value
      let name = e.target.name
      // console.log(value,name)
      setformDetails({...formDetails,[name]:value})
      }
      const handleFileChanger = (e)=>{
        let files = e.target.files
        // console.log(file)
        let filesArr = [...files] 
        // console.log(filesArr)
        setformDetails({...formDetails,image:filesArr})
        }
        const handleSubmit = async ()=>{
          setLoading(true); //Loader
        
        let arr = formDetails.image.map((fileObj)=>{ // it is an array
        let formData = new FormData();
        formData.append('file', fileObj); // append the file to the form data
        formData.append('upload_preset','OmAgroCenter') //BlogApp is upload preset name
        let res1 = axios.post(`https://api.cloudinary.com/v1_1/dztow4xg7/upload`,formData) //dhsb9luqr is cloud name
        return res1
        })
        
        let StringArr = await Promise.all(arr).then((ans)=>ans)
        // console.log(StringArr) //[string,string] data
        
        let finalArr = StringArr.map((item)=>{
          let obj = {};
          obj.url = item.data.secure_url;
          obj.resource_type = item.data.resource_type
          return obj
        })
        
        // console.log(finalArr)
        
        let finalObj = {
          title:formDetails.title,
          description:formDetails.description,
          category:formDetails.category,
          price:formDetails.price,
          size:formDetails.size,
          image:finalArr,
          // file:finalArr
        }
        // console.log(finalArr)
      try {
          
        let res = await axios.post('http://localhost:8090/posts/creates',finalObj,{
          headers:{
            'Authorization':userStore.token
          }
        });
        let data = res.data
        console.log(data)
        if(data.success===true){
          setformDetails({
            title:'',
            description:'',
            category:'',
            price:'',
            size:"",
            image:[]
          })
          setpost(false)
           
        }
        
        if(data.success){
          toast.success(data.msg,{position:"top-center",theme:"dark"})
        }
        // else{
        //   toast.error(data.msg,{position:"top-center",theme:"dark"})
        //   console.log(data.msg)
        // }
      } catch (error) {
        toast.error(data.msg,{position:"top-center",theme:"dark"})
          console.log(error)
      }
        // props.getAllUserPost()// Callback to refresh posts
        setLoading(false) //loading false if post is created
        }
  return (
    <div>
      <center>
      <button onClick={handleCreatePostClick} className='bg-green-400 rounded-md  fixed w-[100%] left-0 right-0  h-12 top-16 z-40 '>Create Post</button>
        </center> 

        <div>
 {post&& <div className='mt-24'>
  <div className="heading text-center font-bold text-2xl m-5 text-gray-800 ">Add product</div>
 <div className="editor mx-auto w-7/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded-md">

  <input name='title' onChange={handleInputChanger} className=" title bg-gray-100 border border-gray-300 rounded-md p-2 mb-4 outline-none" spellCheck="false" placeholder="Title" type="text" />

  <textarea name='description' onChange={handleInputChanger} className=" rounded-md description bg-gray-100 sec p-3 h-30 border border-gray-300 outline-none" spellCheck="false" placeholder="Describe everything about this post here" defaultValue={""} />

  <input name='price' onChange={handleInputChanger} className=" title bg-gray-100 border border-gray-300 rounded-md p-2 mt-4 outline-none" spellCheck="false" placeholder="Price" type="number" />

  <input name='category' onChange={handleInputChanger} className=" title bg-gray-100 border border-gray-300 rounded-md p-2 mt-4 outline-none" spellCheck="false" placeholder="Category" type="text" />

  <input name='size' onChange={handleInputChanger} className=" title bg-gray-100 border border-gray-300 rounded-md p-2 mt-4 outline-none" spellCheck="false" placeholder="Size" type="text" />


  <input onChange={handleFileChanger} multiple id='file' className=" hidden title bg-gray-100 border border-gray-300 rounded-md p-2 mb-4 outline-none" spellCheck="false" placeholder="Title" type="file" />
  <label className='text-gray-400 text-center cursor-pointer title bg-gray-100 border border-gray-300 rounded-md p-2 my-2 outline-none hover:bg-amber-400 hover:text-black' htmlFor="file">Image/Video</label>
 
  
  <div className='flex gap-2 justify-center'>
    {
      formDetails.image.map((ele,i)=>{
        return ele.type.split('/')[0]==='image'? <img className='w-40 h-40' key={i} src={URL.createObjectURL(ele)} alt="" />: <video className='w-40 h-40' key={i} controls src={URL.createObjectURL(ele)}></video>
      })
    }
  </div>
  <div className="buttons flex">
    <div onClick={handleCancelClick} className="rounded-md btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto my-2">Cancel</div>
    
    
    
    <div onClick={handleSubmit} className="rounded-md btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 my-2">{loading ? (
                    <ClipLoader size={25} color="#fff" loading={loading} />
                  ) : (
                    'Post' // using condition to show loading
                  )}</div>
  </div>
</div>
  </div>}
</div> 
<GetallPost/>
    </div>
  )
}

export default CreatePost
