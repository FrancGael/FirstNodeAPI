import React, { useContext, useState } from 'react'
import { userContext } from '../../Context/UserContext'
import axios from 'axios'
import toast from 'react-hot-toast'


function CreatePosts({display, displayPosts}) {
    const {loggedUser} = useContext(userContext)
    const [post, setPost] =useState({
        title: '',
        content: '',
        author: ''
    })
    const registerPost = async(e) => {
        e.preventDefault()
        const uPost = {...post, author: loggedUser._id}
        try{
            await axios.post('/posts',uPost)
              .then((res) => {
                toast.success('Votre post a été créé')
                location.reload();
                display(false)
                displayPosts(true)
              })
        } catch(err){
           toast.error(err.message)
        }
    }
  return (
    <div className='w-full '>
    <form action="" className='flex flex-col gap-4 w-full p-2 rounded-lg shadow-md mx-2' onSubmit={registerPost}>
      <h2 className=' text-4xl font-bold my-4'>Exprimez-vous</h2>
      <label className='font-semibold text-md' htmlFor="title">Votre Titre du post</label>
        <input className='ring-1 p-2 rounded-md focus:ring-slate-700' type="text"  value={post.title} onChange={(e) => setPost({...post, title:e.target.value})} id='name' />
        <label className='font-semibold text-md' htmlFor="content">Contenu du post</label>
         <textarea className='w-full ring-1 rounded-md focus:ring-slate-700' id='content' rows='10' onChange={(e) => setPost({...post, content:e.target.value})} value={post.content} />
        <button className='p-3 ring-1 mt-2 rounded-md bg-neutral-950 text-neutral-200 text-lg hover:bg-transparent hover:text-neutral-700 transition-all ring-black' type='submit'>Enregistrer</button>
        
    </form>
</div>
  )
}

export default CreatePosts