import {useEffect, useState} from "react"
import axios from "axios"
import Row from "./Row"
import { useNavigate } from "react-router-dom"
 
import { Redis } from "https://esm.sh/@upstash/redis";

const client = new Redis({
    url: import.meta.env.VITE_reddisurl,
    token: import.meta.env.VITE_reddistoken,
})
export default function Page2(){
    const url=import.meta.env.VITE_backendurl
      const navigate = useNavigate()
    
    const [details,setDetails]=useState([])
    
    useEffect(()=>{
        async function  getData() { 
            
            setDetails(await client.get("codes"))
            if(details.length==0){
                const res=await axios.get(url+"codes")
                await client.set("codes",res.data.reverse())
                
                setDetails(res.data)
                
            }
            else{
                // 
                let codes=await client.get("codes");
                let a=codes;
                
                while(true){
                    let code=await axios.get(url+"codes/"+(a[0].id+1))
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

    return (
        <div className="flex w-full flex-col justify-center gap-20 p-20 items-center h-auto bg-hero-pattern">
            <button type="button" onClick={()=>navigate("/")} className="focus:outline-none p-5 text-white bg-tertiary hover:bg-purple-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 ">Go Back</button>
<div className="relative overflow-x-auto shadow-md flex-1 rounded-sm">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
</div>
)

}