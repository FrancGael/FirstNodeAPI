import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/UserContext'
import AllPosts from '../Components/AllPosts'
import CreatePosts from '../Components/Create-Posts'
import axios from 'axios'

function Dashboard() {
  const {loggedUser} = useContext(userContext)
   const [displayPosts, setDisplayPosts] = useState(true)
   const [createPosts, setCreatePosts] = useState(false)
   const [userId, setUserId] = useState()
   const [data, setData] = useState([])

   const handleClick = () => {
     setDisplayPosts(!displayPosts)
     setCreatePosts(!createPosts)
   }


  const  GetPosts = async(user) => {
    await axios.get(`/posts/user/${user._id}`)
      .then((res) => {
          if(res.status === 404) return toast.error(res.data.message)
          setData([...data, res.data])
      })
  } 

  useEffect(() => {
    GetPosts(loggedUser);
  }, [loggedUser])

  return (
    <div className='w-full h-full items-center max-w-[1200px] md:mx-auto my-4 py-4 px-2'>
       <h2 className='text-4xl font-bold'>{loggedUser && loggedUser.name}</h2>
      <div className='w-full flex flex-col md:flex-row justify-center h-full gap-4 py-4'>
        <div className='w-full md:w-1/3 h-fit p-4 gap-4 flex flex-col'>
          <button className={`w-full p-4 ring-1 ring-gray-800 rounded-md  text-white text-lg ${displayPosts ? "bg-orange-600 font-bold" : "bg-slate-800"}`} onClick={handleClick}>Mes Postes</button>
          <button className={`w-full p-4 ring-1 ring-gray-800 rounded-md  text-white text-lg ${createPosts ?  "bg-orange-600 font-bold" : "bg-slate-800"}`} onClick={handleClick}>Créer un post</button>
        </div>
        <div className='w-full md:w-2/3 h-full'>
        {displayPosts && data[0] &&  (
            <AllPosts posts={data[0]} />
          )
        }
        {createPosts && <CreatePosts display={setCreatePosts} displayPosts={setDisplayPosts}/>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard