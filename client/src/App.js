import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsUserLoggedIn(true)
    }
  }, [])

  const login = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post('http://localhost:4000/login', {
        username, password
      });
      const token = res.data.token
      localStorage.setItem('token', token)
      setIsUserLoggedIn(true)
    } catch (err) {
      console.log('err: ', err);
      alert("Login Failed")
    }
  }

  const callTestAPI = async (token) => {
    try {
      const res = await axios.post('http://localhost:4000/test', {}, { headers: { Authorization: `Bearer ${token}` } })
      console.log(res.data);
    } catch (err) {
      console.log('err: ', err);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="form-container">
        <form id="trialForm" onSubmit={login}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" placeholder="Enter your username" required value={username} onChange={(e) => setUsername(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type='submit'>Login</button>
        </form>
      </div>
      {isUserLoggedIn && <>
        <button onClick={() => callTestAPI("")}>Call API Without token</button>
        <button onClick={() => callTestAPI("invalid token")}>Call API With Invalid token</button>
        <button onClick={() => callTestAPI(localStorage.getItem('token'))}>Call API With Valid token</button>
      </>
      }
    </div>
  );
}

export default App;
