import React from 'react'
import loading from '../utils/Loading_icon.gif'

export default function Spinner() {
  return (
    <div class='text-center'>
      <img src = {loading} alt=""></img>
    </div>
  )
}
