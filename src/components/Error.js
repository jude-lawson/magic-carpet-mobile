import React from 'react'

const ErrorMessage = (props) => {
  return (
    <Text style={{ color: 'red' }}>{props.message}</Text>
  )
}

export default ErrorMessage;
