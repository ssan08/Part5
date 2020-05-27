import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'testing',
        url: 'url',
        likes: 10
    }

    const component = render(
        <Blog blog={blog} />
    )

    const element1 = component.getByText(
        'Component testing is done with react-testing-library'
    )
    expect(element1).toBeDefined()

    const element2 = component.getByText(
        'testing'
    )
    expect(element2).toBeDefined()

})

test('clicking the button shows blogs url and number of likes', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'testing',
        url: 'url',
        likes: 10
    }
    //const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} />
    )

    fireEvent.click(component.getByText('view'))

    const element1 = component.getByText(
        'Component testing is done with react-testing-library'
    )
    expect(element1).toBeDefined()

    const element2 = component.getByText(
        'testing'
    )
    expect(element2).toBeDefined()

    const element3 = component.getByText(
        'url'
    )
    expect(element3).toBeDefined()

    const element4 = component.getByText(
        '10'
    )
    expect(element4).toBeDefined()
})

test('clicking like button', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'testing',
        url: 'url',
        likes: 10
    }
    const mockHandler = jest.fn()

    const component = render(
        <div>
        <p>{blog.title} </p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => mockHandler()}>like</button></p>
        <p>{blog.author}</p>
      </div>
    )

    fireEvent.click(component.getByText('like'))
    fireEvent.click(component.getByText('like'))


    expect(mockHandler.mock.calls).toHaveLength(2)
})