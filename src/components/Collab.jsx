// import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Collab = () => {
    const navigate = useNavigate()
    const [val,setVal] = useState("")
  return (
    <div>
        <input type="text" onChange={(e)=>{setVal(e.target.value)}}/>
        <button onClick={()=>{navigate(`/collab/c${val}`)}}>Create</button>
        <button onClick={()=>{navigate(`/collab/j${val}`)}}>Join</button>

    </div>
  )
}

export default Collab