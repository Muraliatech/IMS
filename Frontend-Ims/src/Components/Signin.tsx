import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const [success,setSuccess] = useState("")
    const navigate = useNavigate();
    const handleSignup=()=>{
        navigate("/signup")
    }
    const handleSubmit =async()=>{
       try{
        const response  = await axios.post('http://localhost:3002/api/v1/customer/signin', {
            email:email,
            password:password
             
            });
            if(response.status !== 201){
                setError(response.data.message)
            }
            else{
                setSuccess(response.data.message)
                
                console.log(response.data)
                localStorage.setItem('user',JSON.stringify(response.data.user));
                localStorage.setItem('token',response.data.token);
                navigate('/onlineShop')

            }
             
       }catch(err){
        console.log(err)
        setError((err as AxiosError<{ message: string }>).response?.data?.message || "Something went wrong. Please try again.");
       }

    }
    return (
      <div>
        <div className="bg-gray-50 w-full h-screen flex items-center justify-center">
          <div className="bg-slate-50 w-96 h-3/4 rounded-xl  p-9 shadow-2xl  flex flex-col justify-evenly items-center">
           
            <div className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in 
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 mb-1">
                Password
              </label>
              <button className="text-blue-700 hover:underline font-sans">
                Forgot password?
              </button>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-center ">
             
              <button onClick={handleSubmit} className="bg-blue-600 text-white px-10 py-2 rounded hover:bg-sky-600 font-sans cursor-pointer">
                Sign in
              </button>
            </div>
            <div>
              Not a member?{" "}
              <a onClick={handleSignup}   className="text-blue-700 hover:underline font-sans cursor-pointer">
                Sign up
              </a>

              {error && <div className="text-red-500 text-sm  text-center">{error}</div>}
              {success && <div className="text-green-500 text-sm text-center">{success}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  };
  