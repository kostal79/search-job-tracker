import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Login() {
  const location = useLocation();

  return (
    <div>{location?.state?.from}</div>
  )
}
