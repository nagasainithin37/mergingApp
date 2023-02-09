import {useForm} from 'react-hook-form'
import { MdLogin } from "react-icons/md";

function Login() {

     const {register,handleSubmit,formState:{errors}}=useForm()

     var OnSubmit=(obj)=>{
        console.log(obj)
     }
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