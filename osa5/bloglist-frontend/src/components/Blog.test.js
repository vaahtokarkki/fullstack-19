import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
    let component

    beforeEach(() => {
        const blog = {
            title: 'Jest',
            author: 'React',
            likes: '5',
            url: 'localhost'
        }
        component = render(
            <Blog blog={blog} />
        )
    })

    it('renders its children', () => {
        const div = component.container.querySelector('.blog-container')
        expect(div).toBeDefined()
    })

    it('renders correct title and author', () => {
        const div = component.container.querySelector('.blog-title')
        expect(div).toHaveTextContent('Jest React')
    })

    it('renders correct description when title is clicked', () => {
        const div = component.container.querySelector('.blog-title')
        fireEvent.click(div)
        const desc = component.container.querySelector('.blog-description')
        expect(desc).toBeDefined()
        expect(desc).toHaveTextContent('localhost')
        expect(desc).toHaveTextContent('5 likes like')
    })

    it('closes description when title is clicked again', () => {
        const div = component.container.querySelector('.blog-title')
        fireEvent.click(div)
        fireEvent.click(div)
        const desc = component.container.querySelector('.blog-description')
        expect(desc).toBe(null)
    })

})