import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/users';

const allUserSlice = createSlice({
    name: 'allUser',
    initialState: [],
    reducers: {

        appendUser(state, action) {
            state.push(action.payload)
        },
        setUsers(state, action) {
            return action.payload
        },

    },
})

export const initializeusers = () => {
    return async dispatch => {
        const users = await userService.getAllUsers()
        console.log(users);
        dispatch(setUsers(users))
    }
}


export const { appendUser, setUsers } = allUserSlice.actions

export default allUserSlice.reducer