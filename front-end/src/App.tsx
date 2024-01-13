import { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        // Redirect to a success page or another route
        console.log(data);
              // Assuming the token is available in the 'data' response property
        const token = data.token;

      // Store the token in localStorage or sessionStorage
        localStorage.setItem("authToken", token);
        console.log(localStorage.getItem('authToken'));
        // navigate('/home');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
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

export default App;
