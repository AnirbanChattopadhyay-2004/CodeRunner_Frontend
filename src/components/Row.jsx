
export default function Row({id,username,stdinput,sourcecode,language,created,stdoutput,status}){
    function convertUTCToIST(utcDateString) {
        console.log(id)
        try {
            // Create a new Date object from the provided UTC date string
            const utcDate = new Date(utcDateString);
    
            // Calculate the IST offset in milliseconds (IST is UTC+5.5 hours)
            const istOffset = 5.5 * 60 * 60 * 1000;
    
            // Add the IST offset to the UTC date
            const istDate = new Date(utcDate.getTime() + istOffset);
    
            // Extract year, month, day, hours, minutes, and seconds from the IST date
            const year = istDate.getFullYear();
            const month = (istDate.getMonth() + 1).toString().padStart(2, '0');
            const day = istDate.getDate().toString().padStart(2, '0');
            const hours = istDate.getHours().toString().padStart(2, '0');
            const minutes = istDate.getMinutes().toString().padStart(2, '0');
            const seconds = istDate.getSeconds().toString().padStart(2, '0');
    
            // Return the formatted IST date and time string
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        } catch (error) {
            // Handle any errors that might occur during the conversion
            console.error('Error converting UTC to IST:', error);
            return 'Invalid Date';
        }
    }
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {username}
        </th>
        <td className="px-6 py-4">
            {language}
        </td>
        <td className="px-6 py-4">
            {sourcecode.substring(0,100)}
        </td>
        <td className="px-6 py-4">
            {stdinput}
        </td>
        <td className={`px-6 py-4 ${status.charAt(0)=='A'?"text-green-600":"text-rose-600"}`}>
            {status}
        </td>
        <td className="px-6 py-4 ">
            {convertUTCToIST(created)}
        </td>
        <td className="px-6 py-4 ">
            {stdoutput}
        </td>
        <td className="px-6 py-4 cursor-pointer hover:text-red-500 " onClick={()=>{ navigator.clipboard.writeText(sourcecode);
}}>
            Copy
        </td>
        <td className="px-6 py-4 cursor-pointer" onClick={()=>{navigator.clipboard.writeText("http://localhost:5173/page/"+id)}}>
            Share
        </td>
    </tr>
    )
}