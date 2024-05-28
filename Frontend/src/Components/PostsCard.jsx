import { SquarePen, Trash2 } from 'lucide-react'
import React, { useContext } from 'react'
import { userContext } from '../../Context/UserContext'

const PostsCard = ({post}) => {
    const { loggedUser } = useContext(userContext)

  return (
    <div className='p-4 bg-gray-200/20 w-full rounded-md my-4 flex gap-1'>
        <div className="w-full min-w-5/6">
            <div className='flex justify-content-between'>
                <h2 className='items-center text-2xl font-bold'>{post.title}</h2>
            </div>
            <div className='mt-2 mx-2 bg-gray-100 w-full rounded-md p-4'>
                <p>{post.content}</p>
            </div>
        </div>
        {loggedUser && loggedUser._id === post.author && (
            <div className="w-1/6 flex flex-col items-center justify-center gap-2">
                <Trash2 className='w-8 h-8 rounded-md text-red-700 bg-gray-200 cursor-pointer hover:bg-slate-800 hover:text-neutral-200 p-1' />
                <SquarePen className='w-8 h-8 rounded-md text-slate-700 bg-gray-200 cursor-pointer hover:bg-slate-800 hover:text-neutral-200 p-1' />
            </div>
        )}
    </div>
  )
}

export default PostsCard