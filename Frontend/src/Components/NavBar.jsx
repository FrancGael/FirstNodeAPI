import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const paths = [
    {url: '/', label: "Accueil"},
    {url: '/register', label: "Créer un compte "},
    {url: '/login', label: "se connecter"},
    {url: '/dashboard', label: "dashboard"}
]

function NavBar() {
    const router = useNavigate()

    const logOut = async(e) => {
    await axios.post('/users/sign-out')
    .then((res) => {
        toast.success(res.data.message)
        router('/')
        window.location.reload()
    })
    } 

    const {loggedUser} = useContext(userContext)
    return (
    <nav className=" font-semibold bg-slate-600 text-white flex w-full h-[70px]">
        <div className='max-w-[1200px] w-full flex mx-auto justify-between items-center px-4'>
          <div>
            <p className='font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600'> Logo</p>
          </div>
        <div className='flex gap-4'>
          {paths.map(path => (
            <div key={path.label}>
             {loggedUser && (path.url ==='/' || path.url === '/dashboard') && <Link key={path.label} to={path.url}>{path.label}</Link>}
             {!loggedUser && (path.url ==='/' || path.url === '/login' || path.url ==='/register') && <Link key={path.label} to={path.url}>{path.label}</Link>}
             </div>
          ))}
          {loggedUser && (
            <div className='ml-8 cursor-pointer hover:text-orange-600 transition-all' onClick={logOut}> Déconnexion </div>
          )}
       </div>
       </div>
      </nav>
  )
}

export default NavBar