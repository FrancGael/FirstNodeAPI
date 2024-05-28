import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { userContext } from '../../Context/UserContext'
import AllPosts from '../Components/AllPosts'
import PostsCard from '../Components/PostsCard'

function Home() {
  const [data, setData] = useState([])
  const { loggedUser } = useContext(userContext)

  const  GetPosts = async() => {
    await axios.get('/posts')
      .then((res) => {
          if(res.status === 404) return toast.error(res.data.message)
          setData([...data, res.data])
      })
  } 

  useEffect(() => {
    GetPosts();
  }, [])


  return (
    <div className='w-full h-full items-center max-w-[1200px] md:mx-auto my-4 py-4 px-2 '>
      <div className='w-full flex flex-col md:flex-row justify-center h-full gap-4 py-4'>
        <div className='w-full md:w-1/3 h-fit p-4 gap-4 flex flex-col'>
          <h2 className='text-4xl font-bold flex gap-4 relative'>
            <span className='h-20 w-20 bg-gray-400 rounded-full'> </span>
            <span className='ml-4 mt-4'>
              Salut {loggedUser && loggedUser.name}
            </span>
          </h2>
          <p className="text-md font-semibold mx-auto ml-28">Ravi de vous revoir</p>
        </div>
        <div className='w-full md:w-2/3 h-full'>
        { data[0] &&  (
          <AllPosts posts={data[0]} />
        )}
        </div>
      </div>
    </div>
  )
}

export default Home