import {useEffect, useState} from "react"
import axios from "axios"
import Row from "./Row"
import { useNavigate } from "react-router-dom"
// import { Redis } from '@upstash/redis'
import { MoveLeft } from 'lucide-react';
import { Redis } from "https://esm.sh/@upstash/redis";
import animationData from "../assets/loading_animation.json"
import Lottie from "lottie-react";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
const client = new Redis({
    url: import.meta.env.VITE_reddisurl || "https://generous-eel-36876.upstash.io",
    token: import.meta.env.VITE_reddistoken || "AZAMAAIjcDFkMTY1M2M2MzYyNDk0ZDJmYWI0NDZiMGMzNjc0NDgwYXAxMA",
})
export default function Page2(){
    const url=import.meta.env.VITE_backendurl || "http://localhost:3000"
      const navigate = useNavigate()
    
    const [details,setDetails]=useState([])
    
    useEffect(()=>{
        async function  getData() { 
            
            setDetails(await client.get("codes"))
            if(details.length==0){
                const res=await axios.get(url+"/codes")
                await client.set("codes",res.data.reverse())
                
                setDetails(res.data)
                
            }
            else{
                
                let codes=details;
                let a=codes;
                console.log(a)
                while(true){
                    let code=await axios.get(url+"/codes/"+(a[0].id+1))
                    if(code.data.length==0 || !code)
                    break
                a.unshift(code.data)

                }
                await client.set("codes",a)
                setDetails(a)
            }
        }
        getData()
    },[])
    if(!details)
        return <div className='flex justify-center items-center bg-tertiary h-screen text-white'><Lottie animationData={animationData} /></div>
    return (
        <div className="flex w-full flex-col justify-center gap-20 p-20 items-center  bg-hero-pattern min-h-[100vh]" >
            <button type="button" onClick={()=>navigate("/")} className="flex gap-2 items-center focus:outline-none p-5 text-white  hover:bg-purple-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 "><MoveLeft/>Go Back</button>
<div className=" relative flex overflow-x-auto shadow-md flex-1 rounded-sm sm:w-full h-auto ">
    <table className="w-full table-auto text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                <th scope="col" className="px-6 py-3">
                    Language
                </th>
                <th scope="col" className="px-6 py-3">
                    Code
                </th>
                <th scope="col" className="px-6 py-3">
                    StdInput
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    TimeStamp
                </th>
                <th scope="col" className="px-6 py-3">
                    Output 
                </th>
                <th scope="col" className="px-6 py-3">
                    
                </th>
                <th scope="col" className="px-6 py-3">
                     
                </th>
            </tr>
        </thead>
        <tbody>
        {
            details.map((row)=>{
                return <Row key={row.id}  {...row}/>
            })
        }
        </tbody>
      </table>
</div>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
</div>
)

}