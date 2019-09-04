import React from 'react'

const Component = (props) => {
  const { functions } = props
  return (
    <button onClick={() => functions.handleLogout()}>logout</button>
  )
}
export default Component
