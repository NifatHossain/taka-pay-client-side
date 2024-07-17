import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const bcrypt = require('bcryptjs');

const Registration = () => {
    const axiosPublic=useAxiosPublic()
    const navigate= useNavigate()
    const {signUp,updateUserInfo}=useContext(AuthContext)
    const handleSubmit=(e)=>{
        e.preventDefault();
        const name= e.target.name.value;
        const email= e.target.email.value;
        const mobile= e.target.mobile.value;
        const role='pending'
        const balance= 0;
        const pin= e.target.pin.value;
        let firebasePassword=pin;
        firebasePassword+='a'
        if(pin.length<5){
            return alert('pin must contain atleast 5 digits')
        }
        signUp(email,firebasePassword)
            .then(result=>{
                const user= result.user;
                console.log(user)
                updateUserInfo(mobile)
                .then(()=>{
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(pin, salt);
                    // console.log(bcrypt.compareSync("12345", '$2a$10$ggAiZ4iSiQllyH1qXXGG5O2mIPNGUBg8lowQcj2irBZ7yNfG5dMUO'));
                    const data= {name,email,mobile, hash,role,balance}
                    console.log(data)
                    axiosPublic.post('/adduser',data)
                    .then((result)=>{
                         if(result.data.insertedId){
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Successfully Registered User",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/pending')
                         }
                    })
                    
                })
                .catch((error)=>{
                    console.log(error)
                })
            })
            .catch(error=>{
                console.log(error.message)
            })

    
        
    }
    return (
        <div className="max-w-2xl mx-auto pt-10 bg-rose-50 mt-24 p-7">
            <p className="text-xl text-center font-semibold mb-5">Registration</p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input className="border w-1/2 mx-auto p-3 rounded-md " type="text" name="name" placeholder="Enter your Name" />
                <input className="border w-1/2 mx-auto p-3 rounded-md " type="text" name="mobile" placeholder="Enter your mobile number" />
                <input className="border w-1/2 mx-auto p-3 rounded-md " type="email" name="email" placeholder="Enter your email" />
                <input className="border w-1/2 mx-auto p-3 rounded-md " type="number" name="pin" placeholder="Enter a 5 digit pin" />
                <button className="btn w-1/2 mx-auto bg-red-300" type="submit">Register</button>
            </form>
            <p className="mt-4">Already have an account? <Link to={'/'} className="text-blue-700">SignIn</Link> </p>
        </div>
    );
};

export default Registration;