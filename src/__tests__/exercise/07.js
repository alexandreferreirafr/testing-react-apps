// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

function renderWithTheme(ui, {theme = 'light', ...options} = {}) {
  const Wrapper = (props) => <ThemeProvider initialTheme={theme} {...props} />
  return render(ui, {wrapper: Wrapper, ...options})
}

test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  renderWithTheme(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
  //
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
})

test('renders with the dark styles for the dark theme', () => {
  renderWithTheme(<EasyButton>Easy</EasyButton>, {theme: 'dark'})
  const button = screen.getByRole('button', {name: /easy/i})

  expect(button).toHaveStyle(`
    background-color: black;;
    color: white;;
  `)
})

/* eslint no-unused-vars:0 */
