import { MdLogin } from "react-icons/md";
import {useForm} from 'react-hook-form'
import axios from "axios";
function Signup() {

    const {register,handleSubmit,formState:{errors}}=useForm()
    var OnSubmit=(obj)=>{
        axios.post('http://localhost:3000/users/createuser',obj)
        .then(res=>alert(res.data.message))
        .catch(err=>alert(err.message))
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
                <button className="btn btn-primary" type="submit"> SignUp <MdLogin></MdLogin></button>
                </form>
        </div>
       );
}

export default Signup   ;