import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST', // You might need to adjust the HTTP method based on your API requirements
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json", // Specify content type as JSON
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json(); 
      if (response.ok) {
        console.log(data);
        const token = data.token;

        // Store the token in localStorage or sessionStorage
        localStorage.setItem("authToken", token);
        console.log(localStorage.getItem('authToken'));
        navigate('/data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className='back'>
      <button onClick={() => navigate('/home')}>Back</button>
      </div>
      <p>Login</p>
      <div className='login'>
        <label htmlFor='email'>Email : </label>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label htmlFor='password'>Password : </label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default Login;
