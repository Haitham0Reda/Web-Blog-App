import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Editor from '../components/Editor';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3030/posts/${id}`)
            .then((response) => {
                const postInfo = response.data;
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
            .catch((error) => {
                setError('Failed to fetch post information.');
            });
    }, [id]);

    async function updatePost(e) {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await axios.put(`http://localhost:3030/post/${id}`, formData, {
                withCredentials: true,
            });

            if (response.status === 200) {
                navigate(`/post/${id}`); // Navigate to the updated post's page
            } else {
                setError('Failed to update the post.');
            }
        } catch (error) {
            setError('Failed to update the post.');
        }
    }
    return (
        <form onSubmit={updatePost}>
            {error && <div className="error">{error}</div>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <Editor onChange={setContent} value={content} />

            <button style={{ marginTop: '8px' }}>Update Post</button>
        </form>
    );
};

export default EditPost;
