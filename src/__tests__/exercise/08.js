// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import { act } from 'react-test-renderer'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
function UseCounterHookExample() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

// function setup({initialProps} = {}) {
//   const result = {}
//   function TestComponent() {
//     result.current = useCounter(initialProps)
//     return null
//   }
//   render(<TestComponent />)
//   return result
// }

test('exposes the count and increment/decrement functions', async () => {
  // 🐨 render the component
  render(<UseCounterHookExample />)
  // 🐨 get the elements you need using screen
  const counter = screen.getByText(/current count/i)
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const increment = screen.getByRole('button', {name: /increment/i})
  // 🐨 assert on the initial state of the hook
  expect(counter).toHaveTextContent('Current count: 0')
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  await userEvent.click(increment)
  expect(counter).toHaveTextContent('Current count: 1')
  await userEvent.click(decrement)
  expect(counter).toHaveTextContent('Current count: 0')
})

test('exposes the count and increment/decrement functions without component', async () => {
  // const result = setup()
  const {result} = renderHook(useCounter)

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customisation of initial count', async () => {
  // const result = setup({initialProps: {initialCount: 3}})
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})

  expect(result.current.count).toBe(3)
  act(() => result.current.increment())
  expect(result.current.count).toBe(4)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)
})

test('allows customisation of the step', async () => {
  // const result = setup({initialProps: {step: 2}})
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('the step can be changed', async () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 3}})

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

/* eslint no-unused-vars:0 */
