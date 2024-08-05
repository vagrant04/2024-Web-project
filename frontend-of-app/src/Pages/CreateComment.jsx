import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

function CreateComment({ addComment, postId }) {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText) {
            addComment(postId, commentText);
            setCommentText('');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-4">
            <h2 className="text-2xl font-bold mb-4">写评论</h2>
            <form onSubmit={handleSubmit}>
        <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="写评论..."
            className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    评论
                </button>
            </form>
        </div>
    );
}

export default CreateComment;
