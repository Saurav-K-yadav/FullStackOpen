import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './blogform'
import { elementType } from 'prop-types'
import userEvent from '@testing-library/user-event'
import { useEffect } from 'react'

test('Creating a new Form', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
    
    render(<BlogForm createBlog={createBlog}/>)    
    
    const submitButton = screen.getByText('create')
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'Dummy Title')
    await user.type(inputs[1], 'Saurav Kumar yadav')
    await user.type(inputs[2], 'localhost')
    await user.click(submitButton)
    screen.debug( submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Dummy Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Saurav Kumar yadav')
    expect(createBlog.mock.calls[0][0].url).toBe('localhost')

})