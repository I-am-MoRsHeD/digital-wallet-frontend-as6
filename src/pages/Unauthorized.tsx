import { Button } from "@/components/ui/button";
import { Link } from "react-router";


const Unauthorized = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-6">
            You are not authorized!
            Plese eat muri!
            <Link to="/">
                <Button variant="default">Go Back Home</Button>
            </Link>
        </div>
    );
};

export default Unauthorized;