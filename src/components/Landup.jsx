import { useState } from "react";
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Landuppage(){
    const url=import.meta.env.VITE_backendurl
    const navigate = useNavigate()
    const [form,setForm]=useState({
        name:"",
        language:"javascript",
        stdin:""
    })
    async function handleSubmit(e){
        e.preventDefault()
        let id=91
        if(form.language=='javascript')
        id=93
      else if (form.language=="python")
      id=92
    else if(form.language=="cpp")
    id=53
  
        const options = {
            method: 'POST',
            url: import.meta.env.VITE_rapidAPIURL,
            params: {
              base64_encoded: 'true',
            
              wait:"true",
            },
            headers: {
              'content-type': 'application/json',
              'Content-Type': 'application/json',
              'X-RapidAPI-Key': import.meta.env.VITE_rapidAPIKey,
              'X-RapidAPI-Host': import.meta.env.VITE_host
            },
            data: {
              language_id: id,
              source_code: btoa(value),
              stdin: btoa(form.stdin)
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              const res=await axios.post(url+"codes/add",{...form,code:value,stdout:atob(response.data.stdout),status:response.data.status.description})
              navigate("/page");
            } catch (error) {
                console.error(error);
            }
            
    }   
    const [value, setValue] = useState();
    const onChange = (val) => {
      
      setValue(val);
    };
    
    function handlechange(e){
        const {name,value}=e.target
        if(value=='java')
        alert("Please keep the main method inside class Main to run the code")
        setForm({...form,[name]:value})
    }
    return (
        <div className="flex flex-row items-center justify-center w-full h-auto  bg-hero-pattern  ">
        <form onSubmit={handleSubmit} className="mt-10 w-1/2 flex flex-col gap-10 bg-black p-5 rounded-2xl">
                    <label className="flex flex-col gap-3 ">
                        <p className="text-white font-black">Name</p>
                        <input type="text" name="name" value={form.name} onChange={handlechange} className="bg-tertiary h-12 rounded-lg  border-none outline-none p-5 text-white-100" placeholder="What's your good name?" required/>
                    </label>
        
                     <label className="flex flex-col gap-3 ">
                        <p className="text-white font-black">Language</p> 
                       
                        <select id="countries" name="language" onChange={handlechange} className="bg-tertiary h-12 border-none outline-none text-sm rounded-lg  block w-full p-3 dark:bg-tertiary  text-white-100  " required>
    
                                    <option  value="javascript">Javascript</option>
                                    <option  value="java"  >Java</option>
                                    <option  value="cpp">c++</option>
                                    <option  value="python">Python</option>
                        </select>

                        </label>

                    


                    <label className="flex flex-col gap-3 ">
                        <p className="text-white font-black">Standard Input</p>
                        <textarea name="stdin" rows={3} value={form.stdin} onChange={handlechange} className="bg-tertiary text-white rounded-lg border-none outline-none p-5" placeholder="What's the Input ?" />
                    </label>
                    
                    <label className="flex flex-col gap-3 ">
                        <p className="text-white font-black">Code Snippet</p>
                        <CodeMirror value={value} height="200px" theme={tokyoNight}   onChange={onChange} extensions={[java()]} />
                    </label>
                    
                    <button type="submit" className="bg-tertiary h-10 shadow-xl rounded-lg  text-white ">Submit</button>
                    
    </form>
    </div>
    )
}