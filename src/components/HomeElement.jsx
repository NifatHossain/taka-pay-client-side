import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";


const HomeElement = () => {
    const {user}=useAuth()
    const [userRole,setUserRole]=useState('')
    const axiosPublic= useAxiosPublic()
    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const result = await axiosPublic.get(`/getrole/${user.email}`);
                console.log(result.data?.role);
                setUserRole(user.data?.role)
            } catch (error) {
                console.error('Error fetching role:', error);
            }
        };
    
        fetchUserRole();
    }, []);
    return (
        (userRole == 'user')?<div>
            <div className="flex justify-center mt-8">
                <button className="btn bg-rose-300 px-6">Check Balance</button>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-14">
                <div className="flex justify-end">
                    <button className="w-28 border-2 py-3 px-5 rounded-lg">
                        <img src="/cansIn.png" alt="" />
                        <p className="text-center text-sm font-semibold">Cash In</p>
                    </button>
                </div>
                <div className="flex justify-start">
                    <button className="w-28 border-2 py-3 px-5 rounded-lg">
                        <img src="/hand.png" alt="" />
                        <p className="text-center text-sm font-semibold">Cash Out</p>
                    </button>
                </div>
                <div className="flex justify-end">
                    <button className="w-28 border-2 py-3 px-5 rounded-lg">
                        <img src="/transfer.png" alt="" />
                        <p className="text-center text-sm font-semibold">Send Money</p>
                    </button>
                </div>
                <div className="flex justify-start">
                    <button className="w-28 border-2 py-3 px-5 rounded-lg">
                        <img src="/transaction-history.png" alt="" />
                        <p className="text-center text-sm font-semibold">Transection Histroy</p>
                    </button>
                </div>
                    
                
            </div>
        </div>:(userRole=='agent')?<div>
            <div className="flex justify-center mt-8">
                <button className="btn bg-rose-300 px-6">Check Balance</button>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-14">
                {/* <div className="flex justify-end">
                    <button className="w-28 border-2 py-3 px-5 rounded-lg">
                        <img src="/cansIn.png" alt="" />
                        <p className="text-center text-sm font-semibold">Cash In</p>
                    </button>
                </div>
                <div className="flex justify-start">
                    <button className="w-28 border-2 py-3 px-5 rounded-lg">
                        <img src="/hand.png" alt="" />
                        <p className="text-center text-sm font-semibold">Cash Out</p>
                    </button>
                </div> */}
                <div className="flex justify-end">
                    <button className="w-28 border-2 py-3 px-5 rounded-lg">
                        <img src="/transfer.png" alt="" />
                        <p className="text-center text-sm font-semibold">transection Management</p>
                    </button>
                </div>
                <div className="flex justify-start">
                    <button className="w-28 border-2 py-3 px-5 rounded-lg">
                        <img src="/transaction-history.png" alt="" />
                        <p className="text-center text-sm font-semibold">Transection Histroy</p>
                    </button>
                </div>
                    
                
            </div>
        </div>:<>
                <div className="flex justify-center mt-8">
                    <h2 className="text-2xl font-semibold">Welcome Admin</h2>
                </div>
                <div className="grid grid-cols-2 gap-10 mt-14">
                    <div className="flex justify-end">
                        <button className="w-28 border-2 py-3 px-5 rounded-lg">
                            <img src="/management.png" alt="" />
                            <p className="text-center text-sm font-semibold">transection Management</p>
                        </button>
                    </div>
                    <div className="flex justify-start">
                        <button className="w-28 border-2 py-3 px-5 rounded-lg">
                            <img src="/transaction-history.png" alt="" />
                            <p className="text-center text-sm font-semibold">Transection Histroy</p>
                        </button>
                    </div>
                </div>
            </>
    );
};

export default HomeElement;