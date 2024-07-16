import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className="flex justify-center min-h-screen items-center">
            <div>
                <h2>Sorry page not found</h2>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <Link to={'/'}><button className="btn">Return Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;