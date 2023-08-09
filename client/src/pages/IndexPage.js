import React, { useEffect, useState } from 'react';
import Post from '../components/Post';

const IndexPage = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define a function to fetch posts from the backend
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3030/post');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const postsData = await response.json();
                setPosts(postsData);
            } catch (error) {
                setError(error.message);
            }
        };

        // Call the fetchPosts function when the component mounts
        fetchPosts();
    }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

    return (
        <>
            {error && <p>Error: {error}</p>}
            {posts.length > 0 &&
                posts.map(post => (
                    <Post key={post._id} {...post} />
                ))}
        </>
    );
};

export default IndexPage;
