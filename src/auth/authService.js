import axios from "axios";

axios.defaults.withCredentials = true;

const fetchSessionData = async ()=>{
    try {
        console.log("Logging");
        const response = await axios.get('http://localhost:8000/session');
        // if(response.status === 200){
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    } catch (error) {
        return false;
    }
}

export default fetchSessionData;