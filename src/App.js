import { NavLink ,Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Sigup";
import Contactus from "./components/Contactus";
import { useSelector,useDispatch } from "react-redux";
import UserDashBoard from "./components/UserDashBoard"
import { logout } from "./store/userLogin";
function App() {

 let{users,isPending,isSuccess,isError,errMsg}=useSelector(state=>state.user)
 let dispatch=useDispatch();
  return (
    <div>
     
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" to="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {isSuccess===false &&
          <>
        <li className="nav-item">
          <NavLink className="nav-link" to="">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">Signup</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        </>
        }
        {
          isSuccess===true &&
          <li className="nav-item">
            <NavLink className="nav-link" onClick={()=>{ 
                let actionObj=logout()
                dispatch(actionObj)

             }} to="/login">LogOut</NavLink>
          </li>
        }
         <li className="nav-item">
          <NavLink className="nav-link" to="/contactus">contactus</NavLink>
        </li>
        
      </ul>
    </div>
  </div>
</nav>



<Routes>

<Route path='/' element={<Home/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/contactus' element={<Contactus/>}/>
<Route path='/userdashboard' element={<UserDashBoard/>}/>
</Routes>
    </div>
  );
}

export default App;
