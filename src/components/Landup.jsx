import Lottie from "lottie-react";
import animationData from "../assets/animation2.json";
import animationData2 from "../assets/java.json";
import animationData3 from "../assets/python.json";
import animationData4 from "../assets/cpp.json";
import animationData5 from "../assets/javascript.json";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tags } from "@codemirror/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import { autocompletion, completeFromList } from "@codemirror/autocomplete";
import {
  stringMethods,
  mathMethods,
  collectionsMethods,
  javaKeywords,
  javaStandardLibrary,
} from "../assets/java";
import { Play, CloudUpload, Handshake } from "lucide-react";
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
const javaMethods = {
  String: stringMethods,
  Math: mathMethods,
  Collections: collectionsMethods,
  // Add similar entries for other classes
};

const javaCompletions = (context) => {
  const word = context.matchBefore(/\w*/);
  if (!word || (word.from === word.to && !context.explicit)) return null;

  // Combine all suggestions
  const options = [
    ...javaKeywords.map((keyword) => ({ label: keyword, type: "keyword" })),
    ...javaStandardLibrary.map((lib) => ({ label: lib, type: "class" })),
    ...(javaMethods[word.text]?.map((method) => ({
      label: method,
      type: "method",
    })) || []),
  ];

  return {
    from: word.from,
    options,
  };
};
const customCompletions = {
  javascript: completeFromList([
    { label: "console.log", type: "function", detail: "Log output to console" },
    { label: "function", type: "keyword" },
    { label: "const", type: "keyword" },
    { label: "let", type: "keyword" },
  ]),
  python: completeFromList([
    { label: "print", type: "function", detail: "Output to console" },
    { label: "def", type: "keyword" },
    { label: "import", type: "keyword" },
  ]),
  cpp: completeFromList([
    { label: "std::cout", type: "function", detail: "Print to console" },
    { label: "int", type: "keyword" },
    { label: "return", type: "keyword" },
  ]),
  java: javaCompletions,
};

const languageExtensions = {
  javascript: javascript,
  java: java,
  python: python,
  cpp: cpp,
};
export default function Landuppage() {
  const url = import.meta.env.VITE_backendurl || "http://localhost:3000";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    language: "javascript",
    stdin: "",
  });
  const [rundissable, setRundissable] = useState(false);
  const [submitdissable, setSubmitdissable] = useState(false);
  const [collabdissable, setCollabdissable] = useState(false);
  const [output, setOutput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [activeTab, setActiveTab] = useState("input");
  // const [defaultcode,setDefaultcode] = useState("Console.log('Hello World')")
  async function handleSubmit(buttontype) {
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

  const [value, setValue] = useState("console.log('Hello World')");
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
      alert("Please keep the main method inside class Code to run the code");
    setForm({ ...form, [name]: value });
  }
  return (
    <div className="w-full ">
      <div className="h-[100vh]  flex justify-center bg-hero-pattern bg-cover ">
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-[18vh] w-[40vw] justify-between ">
            <Lottie animationData={animationData2} />
            <Lottie animationData={animationData3} />
          </div>
          <div className="flex flex-col">
            <div className="h-[60vh] w-full flex  justify-center">
              <Lottie animationData={animationData} />
            </div>
            <p className="text-lg text-gray-300 italic font-semibold text-center">
              "Code is the canvas, logic is the brush, and innovation is the
              masterpiece."
            </p>
          </div>
          <div className="flex h-[18vh] w-[60vw] justify-between ">
            <Lottie animationData={animationData4} />
            <Lottie animationData={animationData5} />
          </div>
        </div>
      </div>
      <div className="min-h-[100vh] bg-[#0e0a21] w-full flex flex-wrap items-center justify-center max-sm:flex-col">
        <div className=" flex flex-1 p-5 gap-5 max-sm:flex-col ">
          <div className="w-3/5 max-sm:w-[90vw] max-sm:p-5">
            <CodeMirror
              value={value}
              height="90vh"
              width="100%"
              theme={leetCodeTheme}
              extensions={[
                form.language == "java"
                  ? java()
                  : languageExtensions[form.language](),

                autocompletion({
                  override: [customCompletions[form.language]],
                }),
              ]}
              onChange={onChange}
              style={{ fontSize: "18px" }}
              maxWidth="80vw"
            />
          </div>
          <div className="flex flex-col flex-1 gap-5 w-full">
            <div className="flex flex-col justify-between  max-sm:gap-5 w-full">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 mb-5 ">
                <button
                  type="button"
                  onClick={() => {
                    setRundissable(true);
                    handleSubmit("Run");
                  }}
                  className={` text-white font-semibold  flex-1 p-3 max-sm:h-[48px]  rounded-md ${
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
                  className={` text-[#66ff00] font-semibold flex-1 p-3 max-sm:h-[48px] rounded-md ${
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
                <button
                  type="button"
                  onClick={() => {
                    navigate("/collab");
                  }}
                  className={` text-[#ff34f1]  font-semibold flex-1 p-3 max-sm:h-[48px] rounded-md  bg-[#2A2A2A]  hover:bg-[#323232]`}
                  disabled={collabdissable}
                >
                  <div className="flex justify-center gap-1">
                    <Handshake color="#ff34f1" size={25} /> <p>Collab</p>
                  </div>
                </button>
              </div>
              <div className="grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-4   w-full gap-4 xl:gap-6">
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
                      if (lang.id == "java") {
                        setValue(
                          `public class Code{\n public static void main(String args[]){\n System.out.println("Hello World")\n} \n}`
                        );
                        alert("please use Code as the class name");
                      } else if (lang.id == "python")
                        setValue("print('Hello World')");
                      else if (lang.id == "cpp")
                        setValue(
                          "#include <iostream>\nusing namespace std;\nint main() {\n  cout << 'Hello World!';return 0}"
                        );
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
            <div className="flex-1 flex items-center">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handlechange}
                className="bg-[#2A2A2A] h-12 rounded-lg w-[100%] border-none outline-none p-5 text-white-100"
                placeholder="What's your good name?"
                required
              />
            </div>
            <div className="flex flex-col flex-3 gap-1 w-full">
              <div className="flex flex-1 justify-center mb-4 gap-3">
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
                    className="w-full  p-3  bg-[#2A2A2A] text-white rounded-md resize-none"
                  ></textarea>
                ) : (
                  <div className="p-2  bg-[#2A2A2A] text-white rounded-md overflow-scroll min-h-[38.5vh] ">
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
