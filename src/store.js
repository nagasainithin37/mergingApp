import { configureStore} from "@reduxjs/toolkit";
import userLoginReducer from './store/userLogin'

export const store=configureStore({
    reducer:{
        user:userLoginReducer
    }
})