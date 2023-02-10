import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "bootstrap";
import { useNavigate } from "react-router-dom";

export const LoginUser=createAsyncThunk('LoginUser',async(userCredentialsObj,thunkApi)=>{
        
        console.log('userLogin page')
         let result=await axios.post('http://localhost:3000/users/login',userCredentialsObj);
        let data=result.data
        console.log(data)
         if(data.message==='login Successful'){
            console.log("Success")
            localStorage.setItem('token',data.payload)
            localStorage.setItem('profilepic',data.userDetails.imgUrl)
             
        return data
        }
        else{
            return thunkApi.rejectWithValue(data.message)
        }
        
})

export const userLogin=createSlice({
    name:'user',
    initialState:{user:{},isPending:false,isSuccess:false,isError:false,errMsg:''},
    reducers:{
        logout:(state,action)=>{
            localStorage.clear();
            state.user={};
            state.isError=false;
            state.isPending=false;
            state.isSuccess=false;
            state.errMsg=false;

        }
    },
    extraReducers:{
        [LoginUser.pending]:(state,action)=>{
            state.isError=false;
            state.isPending=true
            state.isSuccess=false
            state.user={};
            state.errMsg='';
        },
        [LoginUser.rejected]:(state,action)=>{
            state.isError=true;
            state.isPending=false;
            state.isSuccess=false;
            state.user={};
            state.errMsg=action.payload;
        },
        [LoginUser.fulfilled]:(state,action)=>{
            state.isError=false;
            state.isPending=false;
            state.isSuccess=true;
            state.user=action.payload;
            state.errMsg='';
        }

    }
})
export const {logout}=userLogin.actions;

export default userLogin.reducer;