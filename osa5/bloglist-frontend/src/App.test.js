import React from 'react'
import {
    render, waitForElement
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
jest.mock('./services/blogs')
jest.setTimeout(10000)
import App from './App'

describe('<App />', () => {
    it('if user is not logged in notes are not rendered', async () => {
        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('Kirjaudu')
        )

        const form = component.container.querySelector('.login-form')
        expect(form).toBeDefined()
    })

    it('when user logged in blogs are displayed', async () => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
        }

        localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

        const component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('blogs')
        )

        const p = component.container.querySelector('.user-info')
        expect(p).toHaveTextContent('Teuvo Testaaja logged in')
    })
})