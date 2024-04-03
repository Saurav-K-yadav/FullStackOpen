import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {

        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },

        addLikes(state, action) {
            const id=action.payload.id
            const newstate = state.filter((blog) => blog.id != id)
            newstate.push(action.payload)
            return newstate
        },
        remove(state, action) {
        const newState = state.filter((blog) => blog.id != action.payload.id)
            return newState
        }

    },
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newblog = await blogService.create(content)
        dispatch(appendBlog(newblog))
    }
}


export const setLiked = newBlog => {
    return async dispatch => {
        const blog = await blogService.update(newBlog)
        dispatch(addLikes(blog))
    }
}

export const deleteBlog = blog => {
    return async dispatch => {
        await blogService.remove(blog)
        dispatch(remove(blog))
    }
}

export const { appendBlog, setBlogs,addLikes,remove } = blogSlice.actions

export default blogSlice.reducer