import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

import {getCurrentUser} from "../util/currentUser.util.js";

function CreatePost() {
    const navigate = useNavigate();
    const { circleId } = useParams();
    const [postText, setPostText] = useState('');
    const [postImage, setPostImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (postText && postImage) {
            const formData = new FormData();
            formData.append('authorId', getCurrentUser().id);
            formData.append('circleId', circleId);
            formData.append('content', postText);

            const fileInput = document.querySelector('input[type="file"]');
            const file = fileInput.files[0];
            formData.append('file', file);

            addPost(formData);
            setPostText('');
            setPostImage(null);
        }
    };

    function addPost(postData) {
        fetch('http://127.0.0.1:7001/posts/CreatePosts', {
            method: 'POST',
            body: postData,
        })
            .then(response => {
                console.log('Post created:', response.data);
                navigate(`/CirclePage/${circleId}`);
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">发帖子</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="写点什么..."
                    className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <input
                    type="file"
                    onChange={(e) => setPostImage(e.target.files[0])}
                    className="w-full mb-4"
                />
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    发帖
                </button>
            </form>
        </div>
    );
}

export default CreatePost;

// const addPost = (circleId, text, image) => {
//     const currentUser = getCurrentUser();
//     if (currentUser) {
//         const newPost = {
//             id: data.posts.length + 1,
//             circleId,
//             creator: currentUser.id,
//             time: new Date().toISOString(),
//             text,
//             image,
//             comments: []
//         };
//         data.posts.push(newPost);
//     }
// };
//
// const addComment = (postId, text) => {
//     const currentUser = getCurrentUser();
//     if (currentUser) {
//         const newComment = {
//             id: data.comments.length + 1,
//             postId,
//             creator: currentUser.id,
//             text
//         };
//         data.comments.push(newComment);
//     }
// };
//
