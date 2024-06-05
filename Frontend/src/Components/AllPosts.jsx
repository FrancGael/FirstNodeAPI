import React, { useState } from 'react'
import PostsCard from './PostsCard'
import ModifyPost from './ModifyPost'

function AllPosts({posts, refreshPosts}) {
    const [selectedPost, setSelectedPost] = useState(null)
    return (
        <div className=' px-5 py-3'>
            <div className='flex flex-col'>
                <h2 className=' items-center text-3xl text-center'>Dernières publications</h2>
                {posts.length === 0 ? (
                    <div className='w-full my-20'>
                        <div className='flex justify-between'>
                            <h2 className='items-center text-2xl font-semibold'>Aucun post</h2>
                        </div>
                    </div>
                ) : (
                    <>
                        {!selectedPost && posts.map(post => (
                            <PostsCard key={post._id} post={post} setEditPost={setSelectedPost} />
                        ))}
                        {selectedPost && <ModifyPost postToEdit={selectedPost} cancelToEdit={setSelectedPost} refresh={refreshPosts} />}
                    </>
                )}
            </div>
        </div>
      )
}

export default AllPosts