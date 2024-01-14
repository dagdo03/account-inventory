import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const showData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/data', {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem('authToken'),
          },
        });

        const responseData = await response.json();
        if (response.ok) {
          // Update the state with the fetched data
          setData(responseData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Call the showData function when the component mounts
    showData();
  }, []); // Empty dependency array to run the effect only once when the component mounts
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem('authToken'),
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        localStorage.clear();
        // Redirect to a success page or another route
        navigate('/login'); // Replace with your desired route
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <>
    <div>
      <h2>Data List</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <strong>Title:</strong> {item.title} <br />
            <strong>Username:</strong> {item.username} <br />
            <strong>Password:</strong> {item.password} <br />
          </li>
        ))}
      </ul>
    </div>
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
    </>
    
  );
}

export default Data;
