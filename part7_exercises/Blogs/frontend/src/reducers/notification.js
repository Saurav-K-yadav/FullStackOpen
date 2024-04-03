import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    message: '',
    display:false
};

const notificationSlice = createSlice(
    {
        name: 'notification',
        initialState,
        reducers: {
            createNotification(state, action) {
                const notification = action.payload
                state.message = notification
                     state.display=true
            },
            clearNotification(state, action) {
                state.message = ''
                state.display=false
            }
        }
    }
)
export const { createNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer
