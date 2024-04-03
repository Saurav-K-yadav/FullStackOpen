import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
    name:'',
    username: '',
    token:'',
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state,action){
            const newState = {
                name: action.payload.name,
                username: action.payload.username,
                token:action.payload.token
             }
            return newState
        },
        clearUser(state, action) {
            const newState = {name:'',
                username: '',
                token: '',
            }
            return newState
        }
    }
})

export const { setUser,clearUser}=userSlice.actions 
export default userSlice.reducer

export const deleteUser =() => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogUser');
        dispatch(clearUser())
        blogService.setToken(null);
        window.location.reload();
    }
}

export const newUser = (username,password) => {
    return async dispatch => {
        const currUser = await loginService.login({
            username,
            password,
        });
        console.log(username,password);
        
        window.localStorage.setItem(
            'loggedBlogUser',
            JSON.stringify(currUser)
        );
        blogService.setToken(currUser.token);
        dispatch(setUser(currUser));
    }
}

export const  retriveUserDetails = (loggedUser) => {
    return async dispatch => {
            const tobeSet = JSON.parse(loggedUser);
            dispatch(setUser(tobeSet));
            blogService.setToken(tobeSet.token);
    }
}