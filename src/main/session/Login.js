import React from 'react'

const Component = (props) => {
  const { functions } = props
  return (
    <button onClick={() => functions.handleLogin()}>login</button>
  )
}
export default Component
