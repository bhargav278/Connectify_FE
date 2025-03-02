import { useEffect, useRef } from "react"
import { userLogout } from "../apis/makeRequest"
import { apiRoutes } from "../apis/apiRoutes"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Logout = () => {

    const navigate = useNavigate();
    const isCalled = useRef(false);

    const makeLogout = async ()=> {

        if (isCalled.current) return; // ✅ Prevent second call
        isCalled.current = true;
        try{
            const respose = await userLogout(apiRoutes.logoutApi.path);
            if(respose){
                localStorage.removeItem('token');
                toast.success(respose.msg)
                navigate('/login');
                isCalled.current = true
            }  
        }
        catch(error){
            navigate('/home');
            toast.error(error.msg)
        }
    }

    useEffect(()=>{
        makeLogout()
    },[])

    return null
}

export default Logout