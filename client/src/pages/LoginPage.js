import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setUserinfo } = useContext(UserContext)
    const navigate = useNavigate();
    async function login(e) {
        e.preventDefault();
        await fetch('http://localhost:3030/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(userInfo => {
                    setUserinfo(userInfo)
                    navigate('/');
                })
            } else {
                alert('Invalid username or password');
            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <form action="" className='login' onSubmit={login}>
            <h1>login</h1>
            <input type="text"
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />

            <input type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
        </form>
    )
}

export default LoginPage