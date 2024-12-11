import  { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import {  tags } from "@codemirror/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import { java } from "@codemirror/lang-java";
import animationData from "../assets/loading_animation.json"
import Lottie from "lottie-react";

import axios from 'axios';
const leetCodeTheme = createTheme({
    theme: "dark",
    settings: {
      background: "#1e1e1e", // LeetCode-like dark background
      foreground: "#f5f5f5", // Light foreground
      caret: "#ffcc00", // Yellow caret
      selection: "#4a4a4a", // Darker selection
      gutterBackground: "#1e1e1e", // Match the editor background
      gutterForeground: "#7d8590", // Subtle gutter text
      lineHighlight: "#2A2A2A",
    },
    styles: [
      { tag: tags.keyword, color: "#c792ea" }, // Purple for keywords
      { tag: tags.comment, color: "#355E3B" }, // Green for comments
      { tag: tags.string, color: "#ecc48d" }, // Light yellow for strings
      { tag: tags.variableName, color: "#82aaff" }, // Blue for variables
      { tag: tags.function, color: "#addb67" }, // Green for functions
    ],
  });
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
    if(!code)
        return <div className='flex justify-center items-center bg-tertiary h-screen text-white'><Lottie animationData={animationData} /></div>
  return (
    <div className='h-screen flex justify-center items-center bg-hero-pattern bg-cover'>

<CodeMirror
              value={code}
              height="90vh"
              width="70vw"
              theme={leetCodeTheme}
              extensions={[
                java()]}
              style={{ fontSize: "18px" }}
              maxWidth="80vw"
            />
</div>
  )
}

export default ShareCode