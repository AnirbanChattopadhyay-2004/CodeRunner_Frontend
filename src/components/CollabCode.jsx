import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { tags } from "@codemirror/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import { useNavigate } from "react-router-dom";
import { Play, CloudUpload } from "lucide-react";
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

const languageExtensions = {
  javascript: javascript,
  java: java,
  python: python,
  cpp: cpp,
};
export default function CollabCode() {
  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState();
  const url = import.meta.env.VITE_backendurl || "http://localhost:3000";
  const navigate = useNavigate();
  const param = useParams();
  const room = param.room;
  const collab_url = import.meta.env.VITE_collab_url || "http://localhost:3001";
  useEffect(() => {
    const newSocket = io(collab_url);
    setSocket(newSocket);
    // Cleanup function to disconnect socket on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      });
      socket.emit("join room", room);
      socket.on("receive code", (data) => {
        console.log(data);
        setCode(data);
      });
    }
    return () => {
      socket?.removeAllListeners();
    };
  }, [socket, room]);

  const [form, setForm] = useState({
    name: "",
    language: "javascript",
    stdin: "",
  });
  const [rundissable, setRundissable] = useState(false);
  const [submitdissable, setSubmitdissable] = useState(false);

  const [output, setOutput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [activeTab, setActiveTab] = useState("input");
  async function handleSubmit(buttontype) {
    // e.preventDefault();

    // e.preventDefault();

    // let id = 62;
    // if (form.language == "javascript") id = 63;
    // else if (form.language == "python") id = 71;
    // else if (form.language == "cpp") id = 54;
    // console.log(value);
    // const options = {
    //   method: "POST",
    //   url: import.meta.env.VITE_rapidAPIURL,
    //   params: {
    //     base64_encoded: "true",

    //     wait: "true",
    //   },
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-rapidapi-key": import.meta.env.VITE_rapidAPIKey,
    //     "x-rapidapi-host": import.meta.env.VITE_host,
    //   },
    //   data: {
    //     language_id: id,
    //     source_code: btoa(value),
    //     stdin: btoa(form.stdin),
    //   },
    // };

    try {
      const response = await axios.post(
        "https://coderunner-docker-backend.onrender.com/run",
        { language: form.language, code: value, input: form.stdin }
      );
      // const response = await axios.post("http://localhost:3000/run",{language:form.language,code:value,input:form.stdin});
      // console.log(response.data);
      if (buttontype == "Submit") {
        const res = await axios.post(url + "/codes/add", {
          ...form,
          code: value,
          stdout: atob(response.data.stdout) || atob(response.data.message),
          status: response.data.status.description,
        });
        setSubmitdissable(false);
        navigate("/page");
      } else {
        setOutput(response.data.output);
        setRundissable(false);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const onChange = (val) => {
    if (socket) {
      setCode(val);
      socket.emit("collab code", {
        room: room,
        code: val,
      });
    }
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
    <div className="w-full bg-tertiary bg-cover ">
      <div className="min-h-[100vh] w-full flex items-center justify-center max-sm:flex-col">
        <div className=" flex flex-1 p-5 gap-5 max-sm:flex-col ">
          <div className="w-3/5 max-sm:w-[90vw] max-sm:p-5">
            <CodeMirror
              value={code}
              height="90vh"
              width="100%"
              theme={leetCodeTheme}
              extensions={[
                form.language == "java"
                  ? java()
                  : languageExtensions[form.language](),
              ]}
              onChange={onChange}
              style={{ fontSize: "18px" }}
              maxWidth="95vw"
            />
          </div>
          <div className="flex flex-col flex-1 gap-5">
            <div className="flex flex-col flex-2 justify-start   items-stretch  max-sm:gap-5">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setRundissable(true);
                    handleSubmit("Run");
                  }}
                  className={` text-white font-semibold  flex-1 p-3 max-sm:h-[48px]  rounded-md  ${
                    rundissable
                      ? "bg-[#323232] cursor-not-allowed "
                      : "bg-[#2A2A2A] hover:bg-[#323232]"
                  }`}
                  disabled={rundissable}
                >
                  {rundissable ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-350 20 1000 200"
                    >
                      <circle
                        fill="#8DDEFF"
                        stroke="#8DDEFF"
                        stroke-width="2"
                        r="15"
                        cx="40"
                        cy="65"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          dur="2"
                          values="65;135;65;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="-.4"
                        ></animate>
                      </circle>
                      <circle
                        fill="#8DDEFF"
                        stroke="#8DDEFF"
                        stroke-width="2"
                        r="15"
                        cx="100"
                        cy="65"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          dur="2"
                          values="65;135;65;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="-.2"
                        ></animate>
                      </circle>
                      <circle
                        fill="#8DDEFF"
                        stroke="#8DDEFF"
                        stroke-width="2"
                        r="15"
                        cx="160"
                        cy="65"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          dur="2"
                          values="65;135;65;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="0"
                        ></animate>
                      </circle>
                    </svg>
                  ) : (
                    <div className="flex justify-center gap-1">
                      <Play size={25} /> <p>Run</p>
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitdissable(true);
                    handleSubmit("Submit");
                  }}
                  className={` text-[#66ff00]  font-semibold  flex-1 p-3 max-sm:h-[48px]  rounded-md ${
                    rundissable
                      ? "bg-[#323232] cursor-not-allowed"
                      : "bg-[#2A2A2A] hover:bg-[#323232]"
                  }`}
                  disabled={submitdissable}
                >
                  {submitdissable ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-350 20 1000 200"
                    >
                      <circle
                        fill="#00FF49"
                        stroke="#00FF49"
                        stroke-width="2"
                        r="15"
                        cx="40"
                        cy="65"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          dur="2"
                          values="65;135;65;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="-.4"
                        ></animate>
                      </circle>
                      <circle
                        fill="#00FF49"
                        stroke="#00FF49"
                        stroke-width="2"
                        r="15"
                        cx="100"
                        cy="65"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          dur="2"
                          values="65;135;65;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="-.2"
                        ></animate>
                      </circle>
                      <circle
                        fill="#00FF49"
                        stroke="#00FF49"
                        stroke-width="2"
                        r="15"
                        cx="160"
                        cy="65"
                      >
                        <animate
                          attributeName="cy"
                          calcMode="spline"
                          dur="2"
                          values="65;135;65;"
                          keySplines=".5 0 .5 1;.5 0 .5 1"
                          repeatCount="indefinite"
                          begin="0"
                        ></animate>
                      </circle>
                    </svg>
                  ) : (
                    <div className="flex justify-center gap-1">
                      <CloudUpload color="#66ff00" size={25} /> <p>Submit</p>
                    </div>
                  )}
                </button>

              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4">
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    className={`p-4 rounded-lg border-2
            ${
              selectedLanguage === lang.id
                ? "border-red-500 bg-[#2A2A2A]"
                : "border-gray-700"
            }
           hover:scale-105 transition-transform cursor-pointer`}
                    onClick={() => {
                      if (lang.id == "java")
                        alert("please use Main as the class name");
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
            <div className="flex flex-1 items-center">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handlechange}
                className="bg-[#2A2A2A] h-12 rounded-lg  w-[100%] border-none outline-none p-5 text-white-100"
                placeholder="What's your good name?"
                required
              />
            </div>
            <div className="flex flex-col gap-1 flex-3">
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
                  className="w-full p-3 bg-[#2A2A2A] text-white rounded-md resize-none"
                ></textarea>
              ) : (
                <div className="p-2 bg-[#2A2A2A] text-white rounded-md overflow-scroll min-h-[38.5vh] max-h-[38.5vh]">
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    Output
                  </h3>
                  <pre className="whitespace-pre-wrap break-words">
                    {output}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
