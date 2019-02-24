import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    let component
    let mockHandler

    beforeEach(() => {
        const blog = {
            title: 'Jest',
            author: 'React',
            likes: '5'
        }
        mockHandler = jest.fn()
        component = render(
            <SimpleBlog blog={blog} onClick={mockHandler} />
        )
    })

    it('renders its children', () => {
        const div = component.container.querySelector('.container')
        expect(div).toBeDefined()
    })

    it('renders correct title and author', () => {
        const div = component.container.querySelector('.blog-title')
        expect(div).toHaveTextContent('Jest React')
    })

    it('renders correct amount of likes', () => {
        const div = component.container.querySelector('.blog-description')
        expect(div).toHaveTextContent('blog has 5 likes')
    })

    it('like button fires correct amount of events', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls.length).toBe(2)
    })
})
