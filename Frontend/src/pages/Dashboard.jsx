import React, { useContext } from 'react'
import { userContext } from '../../Context/UserContext'

function Dashboard() {
  const {loggedUser} = useContext(userContext)
  
  return (
    <div>{loggedUser && loggedUser.name}</div>
  )
}

export default Dashboard