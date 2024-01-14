import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async() => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", // Specify content type as JSON
                  },
                  body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                  }),
            });

            const data = await response.json();
            if(response.ok){
                console.log(data);
                navigate('/home');
            }
            
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            <div className="back">
                <button onClick={() => navigate('/home')}>Back</button>
            </div>
            <div className="register">
            <label htmlFor="name">Name : </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <label htmlFor='email'>Email : </label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label htmlFor='password'>Password : </label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button onClick={handleRegister}>Register</button>
            </div>
        </>
    );
};

export default Register;