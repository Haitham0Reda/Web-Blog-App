import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../userContext'

const Header = () => {
    const { setUserinfo, userInfo } = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:3030/profile', {
            credentials: 'include',
        }).then(res => {
            res.json().then(userInfo => {
                setUserinfo(userInfo)
            })
        })
    }, [setUserinfo])

    function logout() {
        fetch('http://localhost:3030/logout', {
            credentials: "include",
            method: "POST" 
        })
        setUserinfo(null)
    }

    const userName = userInfo?.username

    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {userName && (
                    <>
                        <Link to={'/create'}>Create New Post </Link>
                        <Link onClick={logout}>Logout</Link>
                    </>
                )}
                {!userName && (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </>
                )}

            </nav>
        </header>
    )
}

export default Header