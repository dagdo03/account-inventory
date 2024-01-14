import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="title">
                <h2>Welcome to account inventory</h2>
            </div>
            <div className="button-action">
                {/* Use arrow function to pass parameters to the handleNavigation function */}
                <button onClick={() => navigate('/register')}>Register</button>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    );
};

export default Home;
