import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add(){
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleAdd = async() => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/newdata',{
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json", // Specify content type as JSON
                    Authorization: "Bearer " + localStorage.getItem('authToken'),
                },
                body: JSON.stringify({
                    title: title,
                    username: username,
                    password: password,
                    author_id: '',
                }),
            });

            const data = await response.json();
            if(response.ok){
                console.log(data);
                navigate('/data');
            }
        } catch (error) {
            
        }
    };

    return (
        <>
            <div className="add">
                <label htmlFor="title">Title : </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <label htmlFor="username">Username : </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <label htmlFor="password">Password : </label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button onClick={handleAdd}>Create</button>
            </div>
        </>
    );
}

export default Add;