import 'jest-dom/extend-expect'
import React from 'react'
import {wait, cleanup, renderIntoDocument} from 'react-testing-library'
import * as mockUtils from '../utils'
import {GreetingLoader} from '../greeting-loader-02'

jest.mock('../utils', () => ({
  loadGreeting: jest.fn(subject =>
    Promise.resolve({
      data: {greeting: `Hi ${subject}`},
    }),
  ),
}))

afterEach(cleanup)

test('loads greetings on click', async () => {
  const {getByLabelText, getByText, getByTestId} = renderIntoDocument(
    <GreetingLoader />,
  )
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  loadButton.click()
  await wait(() => expect(getByTestId('greeting')).toHaveTextContent('Hi Mary'))
  expect(mockUtils.loadGreeting).toHaveBeenCalledTimes(1)
  expect(mockUtils.loadGreeting).toHaveBeenCalledWith('Mary')
})
