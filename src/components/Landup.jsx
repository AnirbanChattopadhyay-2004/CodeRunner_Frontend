import Lottie from "lottie-react";
import animationData from "../assets/animation2.json"
import animationData2 from "../assets/java.json"
import animationData3 from "../assets/python.json"
import animationData4 from "../assets/cpp.json"
import animationData5 from "../assets/javascript.json"
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const languageExtensions = {
  javascript: javascript,
  java: java,
  python: python,
  cpp: cpp,
};
export default function Landuppage() {
  const url =
    import.meta.env.VITE_backendurl ||
    "https://coderunner-backend-1xek.onrender.com";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    language: "javascript",
    stdin: "",
  });
  const [output,setOutput]=useState("")
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [activeTab, setActiveTab] = useState("input");
  async function handleSubmit(buttontype) {
    // e.preventDefault();
    
    let id = 62;
    if (form.language == "javascript") id = 63;
    else if (form.language == "python") id = 71;
    else if (form.language == "cpp") id = 54;
    console.log(value)
    const options = {
      method: "POST",
      url: import.meta.env.VITE_rapidAPIURL,
      params: {
        base64_encoded: "true",
        
        wait: "true",
      },
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-key': import.meta.env.VITE_rapidAPIKey,
        'x-rapidapi-host': import.meta.env.VITE_host,      
      },
      data: {
        language_id: id,
        source_code: btoa(value),
        stdin: btoa(form.stdin)
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      if(buttontype=="Submit"){

        const res = await axios.post(url + "/codes/add", {
          ...form,
          code: value,
          stdout: atob(response.data.stdout) || atob(response.data.message),
          status: response.data.status.description,
        });
        navigate("/page");
      } else {
        if(response.data.stdout)
        setOutput(atob(response.data.stdout))
        else
        setOutput(atob(response.data.message))
      }
    } catch (error) {
      console.error(error);
    }
  }
  const [value, setValue] = useState();
  const onChange = (val) => {
    setValue(val);
  };

  const languages = [
    { id: "javascript", name: "JavaScript", icon: "/javascript.webp" },
    { id: "java", name: "Java", icon: "/java.webp" },
    { id: "cpp", name: "C++", icon: "/cpp.webp" },
    { id: "python", name: "Python", icon: "/python.webp" },
  ];
  function handlechange(e) {
    const { name, value } = e.target;
    if (value == "java")
      alert("Please keep the main method inside class Main to run the code");
    setForm({ ...form, [name]: value });
  }
  return (
    <div className="w-full bg-hero-pattern bg-cover ">
      {/* <form onSubmit={handleSubmit} className="mt-10 w-3/4 md:w-1/2 flex flex-col gap-10 bg-black p-5 rounded-2xl">
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
                    
                    </form> */}
      <div className="h-[100vh] flex justify-center bg-hero-pattern bg-cover ">
        <div className="flex flex-col items-center justify-center">
        <div className="flex h-[18vh] w-[40vw] justify-between ">
          <Lottie animationData={animationData2} />
          <Lottie animationData={animationData3} />
        </div>
        <div className="flex flex-col">

        <div className="h-[60vh] w-full flex  justify-center">
          <Lottie animationData={animationData} />
          
        </div>
        <p className="text-lg text-gray-300 italic font-semibold">
          "Code is the canvas, logic is the brush, and innovation is the masterpiece."
      </p>
         </div>
        <div className="flex h-[18vh] w-[60vw] justify-between ">
          <Lottie animationData={animationData4} />
          <Lottie animationData={animationData5} />
        </div>
        </div>
        
      </div>
      <div className="h-[100vh] w-full flex items-center justify-center">
        <div className=" flex flex-1 p-5 gap-5">
          <div className="w-3/5">
            <CodeMirror
              value={value}
              height="90vh"
              width="100%"
              theme={tokyoNight}
              extensions={[languageExtensions[form.language]()]}
              onChange={onChange}
              style={{fontSize:"21px"}}
            />
          </div>
          <div className="flex flex-col flex-1 gap-5">
            <div className="flex flex-col justify-between  items-center flex-1 ">
              <div className="w-full flex gap-3 items-center flex-1">
                <button type="button" onClick={()=>{handleSubmit("Run")}} className="bg-blue-500 flex-1 h-[50%] rounded-md">Run</button>
                <button type="button" onClick={()=>{handleSubmit("Submit")}} className="bg-green-500 flex-1 h-[50%] rounded-md">Submit</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4">
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    className={`p-4 rounded-lg border-2
            ${
              selectedLanguage === lang.id
                ? "border-red-500 bg-gray-800"
                : "border-gray-700"
            }
           hover:scale-105 transition-transform cursor-pointer`}
                    onClick={() => {
                      if(lang.id == 'java')
                        alert("please use Main as the class name")
                      setSelectedLanguage(lang.id);
                      setForm((prev) => {
                        return { ...prev, language: lang.id };
                      });
                    }}
                  >
                    <img
                      src={lang.icon}
                      alt={lang.name}
                      className="w-16 h-16 mx-auto rounded-md"
                    />
                    <p className="mt-2 text-center text-white">{lang.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handlechange}
                className="bg-gray-900 h-12 rounded-lg  w-[100%] border-none outline-none p-5 text-white-100"
                placeholder="What's your good name?"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-center mb-4 gap-3">
                <button
                  className={`px-4 py-2 border-b-2 flex-1 rounded-md ${
                    activeTab === "input"
                      ? "border-red-500 bg-red-500 text-white-100 font-bold"
                      : "border-transparent bg-white-100 font-bold"
                  }`}
                  onClick={() => setActiveTab("input")}
                >
                  Input
                </button>
                <button
                  className={`px-4 py-2 border-b-2 flex-1 rounded-md ${
                    activeTab === "output"
                      ? "border-red-500 bg-red-500 text-white-100 font-bold"
                      : "border-transparent bg-white-100 font-bold"
                  }`}
                  onClick={() => setActiveTab("output")}
                >
                  Output
                </button>
              </div>

              {activeTab === "input" ? (
                <textarea
                  name="stdin"
                  value={form.stdin}
                  onChange={handlechange}
                  placeholder="Enter Standard Input"
                  rows={10}
                  className="w-full p-2 bg-gray-900 text-white rounded-md resize-none"
                ></textarea>
              ) : (
                <div className="p-2 bg-gray-900 text-white rounded-md overflow-scroll min-h-[37.5vh] max-h-[37.5vh]">
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    Output
                  </h3>
                  <pre className="whitespace-pre-wrap break-words">{output}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
