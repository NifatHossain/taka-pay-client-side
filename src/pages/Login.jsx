import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";


const Login = () => {
    const axiosPublic=useAxiosPublic()
    const {signIn}=useAuth()
    // const location=useLocation()
    const navigate= useNavigate()
    const handleLogin = async(e) => {
        e.preventDefault()
        const email=e.target.email.value;
        let password=e.target.pin.value;
        password+='a'
        const result=await axiosPublic.get(`/getrole/${email}`)
        console.log(result.data?.role);
        if(result.data?.role=='pending'){
            return Swal.fire({
                title: "Pending",
                text: "Your account is still pending",
                icon: "error",
                showConfirmButton: false,
                timer: 3500
            });
                
            
        }
        signIn(email,password)
        .then(result=>{
            const user= result.user;
            console.log(user);
            Swal.fire({
                title: "success",
                text: "login successfull",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
            navigate(location?.state? location.state:'/home')
        })
        .catch(error=>{
            console.log(error.message)
            Swal.fire({
                title: "Error",
                text: "Wrong Email or Password",
                icon: "error"
            });
        })
    }
    return (
        <div className="max-w-2xl mx-auto pt-10 bg-rose-50 mt-24 p-7">
            <p className="text-xl text-center font-semibold mb-5">Login</p>
            <form onSubmit={handleLogin} className="flex flex-col space-y-3">
                <input className="border w-1/2 mx-auto p-3 rounded-md " type="email" name="email" placeholder="Enter your email" />
                <input className="border w-1/2 mx-auto p-3 rounded-md " type="number" name="pin" placeholder="Enter a 5 digit pin" />
                <button className="btn w-1/2 mx-auto bg-red-300" type="submit">Login</button>
            </form>
            <p className="mt-4">Don&apos;t have an account? <Link to={'/register'} className="text-blue-500">Register</Link> </p>
        </div>
    );
};

export default Login;