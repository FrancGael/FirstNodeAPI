import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext'

function Login() {
  const [user, setUser]= useState({
    email: '',
    password: '',
  })

  const {loggedUser} = useContext(userContext)

  const router = useNavigate()

  useEffect(()=> {
    if(loggedUser) {
      router('/dashboard')
    }
  })

  const LoginUser = async(e) => {
    e.preventDefault()
    try{
      await axios.post('/users/sign-In', user)
        .then((res) => {
          if(res.data.status === 'error') toast.error(res.data.message) 
          if(res.data.status === 'success'){
            toast.success(res.data.message)
            router('/dashboard')
            window.location.reload()
          }
        })
    }catch(err){
      toast.error('Erreur innatendue:' + err.message)
  
  }}
  
  return (
    <div className='w-full h-full flex mt-16 justify-center'>
        <form action="" className='flex flex-col gap-8 w-full md:w-2/5 p-4 ring-1 ring-slate-200 rounded-lg shadow-md mx-2' onSubmit={LoginUser}>
          <h2 className=' text-5xl font-bold my-4  text-center'>Se connecter</h2>
            <label className='font-semibold text-md' htmlFor="email">Adresse Email</label>
            <input className='ring-1 p-2 rounded-md focus:ring-slate-700' type="email" name='email' value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} id='email' />
            <label className='font-semibold text-md' htmlFor="password">Saisissez votre mot de passe</label>
            <input className='ring-1 p-2 rounded-md focus:ring-slate-700' type="password" name='password' value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} id='password' />
            <button className='p-4 ring-1 mt-2 rounded-md bg-neutral-950 text-neutral-200 text-lg hover:bg-transparent hover:text-neutral-700 transition-all ring-black' type='submit'>Connecter</button>
            <p className='mt-4 mb-8'>Vous avez déjà un compte? <span><Link to='/register' className='font-semibold underline text-sky-800'>Enregistrer</Link></span></p>
        </form>
    </div>
  )
  
}

export default Login