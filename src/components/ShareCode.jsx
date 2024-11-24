import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";

import axios from 'axios';
import { javascript } from '@codemirror/lang-javascript';
const ShareCode = () => {
    const param=useParams()
    const url=import.meta.env.VITE_backendurl || "https://coderunner-backend-1xek.onrender.com"
    const [code,setCode] = useState()
    useEffect(()=>{
        async function getcode(){
            try{
                console.log("id",param.id)
                const res = await axios.get(url+"/codes/"+param.id)
                setCode(res.data.code.sourcecode)
                console.log(res.data.code.sourcecode)
            } catch (error) {
                console.error(error);
            }
        }
        getcode()
    },[])
  return (
    <div className='h-screen flex justify-center items-center bg-hero-pattern bg-cover'>

    <CodeMirror
              value={code}
              height="90vh"
              width="60vw"
              theme={tokyoNight}
              style={{fontSize:"18px"}}
              maxWidth="80vw"
              extensions={[javascript()]}
              
              />
</div>
  )
}

export default ShareCode