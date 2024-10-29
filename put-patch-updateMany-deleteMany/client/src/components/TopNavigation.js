import React from 'react'
import { Link } from 'react-router-dom'

function TopNavigation() {
  return (
    <div className='top'>
        <Link to="/topnavigation">TopNavigation</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/leaves">Leaves</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/editprofile">EditProfile</Link>
        <Link to="/">SignOut</Link>
     
      
    </div>
  )
}

export default TopNavigation
