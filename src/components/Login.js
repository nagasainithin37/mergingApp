import {useForm} from 'react-hook-form'
import { MdLogin } from "react-icons/md";
import { LoginUser } from '../store/userLogin';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
function Login() {

     const {register,handleSubmit,formState:{errors}}=useForm()
     let{users,isPending,isSuccess,isError,errMsg}=useSelector(state=>state.user)
let dispatch=useDispatch();
 let navigate=useNavigate()
 if(isSuccess==true){
    console.log('Satisfied')
    navigate('/userdashboard')
 }
 if(isError===true){
   alert(`${errMsg}`)
 }
     var OnSubmit=(obj)=>{
        dispatch(LoginUser(obj))
       

     };
    return ( 
   <div>
        
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
                <button className="btn btn-primary" type="submit"> Login <MdLogin></MdLogin></button>
                </form>       

    </div> );
}

export default Login;