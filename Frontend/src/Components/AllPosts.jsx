import React from 'react'
import PostsCard from './PostsCard'

function AllPosts({posts}) {
    return (
        <div className=' px-5 py-3'>
            <div className='d-flex'>
                <h2 className=' items-center text-3xl text-center'>Dernières publications</h2>
                {posts.length === 0 ? (
                    <div className='w-full my-20'>
                        <div className='flex justify-between'>
                            <h2 className='items-center text-2xl font-semibold'>Aucun post</h2>
                        </div>
                    </div>
                ) : (
                    posts.map(post => (
                        <PostsCard key={post._id} post={post} />
                    ))
                )}
            </div>
        </div>
      )
}

export default AllPosts