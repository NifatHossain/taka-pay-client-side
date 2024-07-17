import HomeElement from "../components/HomeElement";
import Navbar from "../components/Navbar";


const Home = () => {
    return (
        <div className="max-w-2xl mx-auto p-5 bg-red-50 min-h-screen">
            <Navbar></Navbar>
            <HomeElement></HomeElement>
        </div>
    );
};

export default Home;