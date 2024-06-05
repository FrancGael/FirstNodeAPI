import React, { useContext, useState } from 'react'
import { userContext } from '../../Context/UserContext'
import axios from 'axios'
import toast from 'react-hot-toast'



function ModifyPost({postToEdit, cancelToEdit, refresh}) {

const {loggedUser} = useContext(userContext)
const [post, setPost] =useState({
    title: postToEdit.title,
    content: postToEdit.content,
    id: postToEdit._id
})

const handleCancel = () => {
    cancelToEdit(null)
}

const updatePost = async(e) => {
    e.preventDefault()
    try{
        await axios.put(`/posts/${post.id}`, post)
          .then((res) => {
            toast.success('Votre post a été modifié')
            cancelToEdit(null)
            refresh("update")
          })
    } catch(err){
       toast.error('Erreur de modification')
    }
}

  return (
    <div className='w-full'>
        <form action="" className='flex flex-col gap-4 w-full p-2 rounded-lg shadow-md mx-2' >
        <h2 className=' text-4xl font-bold my-4'>Modifier le post</h2>
        <label className='font-semibold text-md' htmlFor="title">Votre Titre du post</label>
            <input className='ring-1 p-2 rounded-md focus:ring-slate-700' type="text"  value={post.title} onChange={(e) => setPost({...post, title:e.target.value})} id='name' />
            <label className='font-semibold text-md' htmlFor="content">Contenu du post</label>
            <textarea className='w-full ring-1 rounded-md focus:ring-slate-700' id='content' rows='10' onChange={(e) => setPost({...post, content:e.target.value})} value={post.content} />
            <div className="flex gap-4">
            <button className='w-1/3 p-3 ring-1 mt-2 rounded-md bg-yellow-600 text-neutral-200 text-lg hover:bg-transparent hover:text-orange-500 transition-all ring-yellow-600' onClick={handleCancel}>Annuler</button>
            <button className='w-2/3 p-3 ring-1 mt-2 rounded-md bg-neutral-950 text-neutral-200 text-lg hover:bg-transparent hover:text-neutral-700 transition-all ring-black' type='submit' onClick={updatePost}>Modifier</button>
            </div>
            
        </form>
    </div>
  )
}

export default ModifyPost