// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

function buildLoginForm(overrides) {
  return {
    username : faker.internet.userName(),
    password : faker.internet.password(),
    ...overrides,
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  let submittedData
  const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />)
  //
  // 🐨 get the username and password fields via `getByLabelText`
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  const submit = screen.getByRole('button', { name: /submit/i })
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  await userEvent.type(username, 'Alexandre')
  await userEvent.type(password, 'secret')
  //
  // 🐨 click on the button with the text "Submit"
  await userEvent.click(submit)
  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
  expect(submittedData).toEqual({ username: 'Alexandre', password: 'secret' })
})

test('submitting the form calls onSubmit with username and password with Jest Function Mock', async () => {
  let submittedData
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  const submit = screen.getByRole('button', { name: /submit/i })

  await userEvent.type(username, 'Alexandre')
  await userEvent.type(password, 'secret')

  await userEvent.click(submit)

  expect(handleSubmit).toBeCalledWith({ username: 'Alexandre', password: 'secret' })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('submitting the form calls onSubmit with username and password with Generated data', async () => {
  let submittedData
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)
  const submit = screen.getByRole('button', { name: /submit/i })

  const {username, password} = buildLoginForm()

  await userEvent.type(usernameField, username)
  await userEvent.type(passwordField, password)

  await userEvent.click(submit)

  expect(handleSubmit).toBeCalledWith({ username, password })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
