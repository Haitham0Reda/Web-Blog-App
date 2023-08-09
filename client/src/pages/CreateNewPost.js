import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Editor from '../components/Editor';


const CreateNewPost = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    async function CreatePost(e) {
        e.preventDefault();

        // Create a new FormData object to send the post data, including the uploaded file
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.append('file', files[0]);

        // Send a POST request using axios to the backend server to create the post
        try {
            const response = await axios.post('http://localhost:3030/post', data, {
                withCredentials: true, // Include credentials (e.g., cookies) with the request
            });

            if (response.status === 200) {
                navigate('/'); // Navigate back to the index page after successful post creation
                fetchAllPosts(); // Fetch all posts to update the frontend with the new post
            } else {
                console.error('Failed to create post:', response.statusText);
            }
        } catch (error) {
            console.error('Error while creating the post:', error);
        }
    }

    async function fetchAllPosts() {
        try {
            const response = await axios.get('http://localhost:3030/posts', {
                withCredentials: true,
            });

            if (response.status === 200) {
                navigate('/'); // Navigate back to the index page after successful post creation
                fetchAllPosts(); // Fetch all posts to update the frontend with the new post
            } else {
                console.error('Failed to create post:', response.statusText);
            }
        } catch (error) {
            console.error('Error while fetching posts:', error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');

            if (navigate) {
                // Fetch all posts when the component mounts
                fetchAllPosts();
            }
        }
    }, []);



    return (
        <form onSubmit={CreatePost}>
            <input
                type="text"
                placeholder='title'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder='summary'
                value={summary}
                onChange={e => setSummary(e.target.value)}
            />
            <input type="file" onChange={e => setFiles(e.target.files)} />

            <Editor onChange={setContent} value={content} />

            <button style={{ marginTop: '8px' }}>Create Post</button>
        </form>
    );
}

export default CreateNewPost;
