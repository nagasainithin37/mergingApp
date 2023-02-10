import { MdLogin } from "react-icons/md";
import {useForm} from 'react-hook-form'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Signup() {
        let [image,setImage]=useState(null)
const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors}}=useForm()
    var OnSubmit=(obj)=>{
        let formData=new FormData()
        formData.append("userObj",JSON.stringify(obj))
        formData.append("photo",image)
        axios.post('http://localhost:3000/users/createuser',formData)
        .then(res=>{
            if(res.data.message=='User created successfully'){
                navigate('/login')
            }
            else{
                alert(res.data.message)
            }
        })
        .catch(err=>alert(err.message))
    }



    var onImageChange=(event)=>{
        
        setImage(event.target.files[0])
    }
    return ( 
        <div className="mx-auto">
            <form className="mx-auto w-50" onSubmit={handleSubmit(OnSubmit)}>
                
                <div className="mb-3">
                    <label htmlFor="username">UserName</label>
                    <input type="text" className="form-control" {...register('username',{required:true})} />
                    {errors.username?.type==='required' && <p className="text-danger">* Username is required</p> }
                </div>

                 <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" {...register('password',{required:true})} />
                     {errors.password?.type==='required' && <p className="text-danger">* Password is required</p> }
                </div>

                <div className="mb-3">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" {...register('city',{required:true})} />
                     {errors.city?.type==='required' && <p className="text-danger">* city is required</p> }
                </div>
                <div className="input-group mb-3">
                <label className="input-group-text" for="inputGroupFile01">Profile Pic</label>
                <input type="file" {...register('photo',{required:true})}
                 onChange ={onImageChange} 
                />
                 {errors.photo?.type==='required' && <p className="text-danger">* Image is required</p> }
                </div>
                <button className="btn btn-primary" type="submit"> SignUp <MdLogin></MdLogin></button>
                </form>
        </div>
       );
}

export default Signup   ;