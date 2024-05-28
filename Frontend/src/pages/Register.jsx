import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/UserContext'

function Register() {

  const [user, setUser]= useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })
  
  const router = useNavigate()
  const {loggedUser} = useContext(userContext)
  useEffect(()=> {
    if(loggedUser) {
      router('/dashboard')
    }
  })

  const registerUser = async(e) => {
    e.preventDefault()
    try{
      await axios.post('/users/sign-up', user)
        .then((res) => {
          if(res.data.status === 'error') toast.error(res.data.message) 
          if(res.data.status === 'success'){
            toast.success(res.data.message)
            router('/login')
          }
        })
    }catch(err){
      toast.error('Erreur innatendue:' + err.message)
  
  }}
  return (
    <div className='w-full h-full flex mt-16 justify-center'>
        <form action="" className='flex flex-col gap-8 w-full md:w-2/5 p-4 ring-1 ring-slate-200 rounded-lg shadow-md mx-2' onSubmit={registerUser}>
          <h2 className=' text-5xl font-bold my-4'>Créer votre compte</h2>
          <label className='font-semibold text-md' htmlFor="name">Votre Nom</label>
            <input className='ring-1 p-2 rounded-md focus:ring-slate-700' type="text" name='name' value={user.name} onChange={(e) => setUser({...user, name:e.target.value})} id='name' />
            <label className='font-semibold text-md' htmlFor="email">Adresse Email</label>
            <input className='ring-1 p-2 rounded-md focus:ring-slate-700' type="email" name='email' value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} id='email' />
            <label className='font-semibold text-md' htmlFor="password">Saisissez votre mot de passe</label>
            <input className='ring-1 p-2 rounded-md focus:ring-slate-700' type="password" name='password' value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} id='password' />
            <label className='font-semibold text-md' htmlFor="cpassword" >Confirmez votre mot de passe</label>
            <input className='ring-1 p-2 rounded-md focus:ring-slate-700' type="password" name='cPassword' value={user.confirm_password} onChange={(e) => setUser({...user, confirm_password:e.target.value})} id='cpassword' />
            <button className='p-4 ring-1 mt-2 rounded-md bg-neutral-950 text-neutral-200 text-lg hover:bg-transparent hover:text-neutral-700 transition-all ring-black' type='submit'>Enregistrer</button>
            <p className='mt-4 mb-8'>Voulez-vous vous connecter? <span><Link to='/login' className='font-semibold underline text-sky-800'>Connectez-Vous</Link></span></p>
        </form>
    </div>
  )
}

export default Register