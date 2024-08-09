import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import PropTypes from "prop-types";
import axios from 'axios';

import {getCurrentUser} from "../util/currentUser.util.js";

import comment_icon from '../../svgs/comment-regular.svg';
import like_icon from '../../svgs/thumbs-up-solid.svg';
import share_icon from '../../svgs/share-from-square-solid.svg';

// eslint-disable-next-line react/prop-types
export default function CirclePage(){
    const navigate = useNavigate();
    const { circleId } = useParams();
    const [circle, setCircle] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch circle data from the backend
        axios.get(`http://127.0.0.1:7001/circles/GetCircle_By_ID/${circleId}`)
            .then(response => {
                setCircle(response.data.circle);
                setPosts(response.data.posts);
                console.log('circle:', circle);
                console.log('posts:', posts);
            })
            .catch(error => {
                console.error('Error fetching circle data:', error);
            });
    }, [circleId]);

    if (!circle) {
        return <div>加载中...</div>;
    }

    function handleCreatePost() {
        // 创建帖子逻辑...
        navigate(`/CreatePost/${circleId}`)
        // 创建成功后刷新页面
        //window.location.reload();
    }

    function handleBackToHomePage() {
        // 返回主页逻辑...
        navigate('/Homepage');
    }

    return (
        <div className="bg-gray-100 min-h-screen min-w-96 p-6">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-4">{circle.name}</h2>
                {posts.map((post, index) => (
                    <PostCard key={index} post={post} posts={posts} setPosts={setPosts}/>
                ))}
                <button onClick={handleCreatePost}
                        className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600 transition duration-200">
                    发布帖子
                </button>
                <button onClick={handleBackToHomePage}
                        className="w-full bg-gray-500 text-white py-2 mt-4 rounded-lg hover:bg-gray-600 transition duration-200">
                    返回主页
                </button>
            </div>
        </div>
    );
}

CirclePage.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        authorName: PropTypes.string,
        authorAvatar: PropTypes.string,
        date: PropTypes.string,
        content: PropTypes.string,
        images: PropTypes.arrayOf(PropTypes.string),
        likes: PropTypes.number,
        comments: PropTypes.number,
        shares: PropTypes.number,
    })).isRequired,
};

const PostCard = ({ post, posts, setPosts }) => {
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:7001/comments/GetComments_By_Post_ID/${post.id}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [post.id]);

    const addComment = (postId, text) => {
        const newComment = {
            postId,
            creator: getCurrentUser().id,
            text
        };

        axios.post('http://127.0.0.1:7001/comments/CreateComment', newComment, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setComments([...comments, response.data]);
                // 更新 post.comments 数组
                const updatedPosts = posts.map(post => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            comments: [...post.comments, response.data]
                        };
                    }
                    return post;
                });
                setPosts(updatedPosts);
            })
            .catch(error => {
                console.error('Error creating comment:', error);
            });
    };

    return (
        <div className="mb-6 p-4 border rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
                <img
                    src={`http://127.0.0.1:7001/uploads/${post.authorAvatar}`}
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <h4 className="text-lg font-bold">{post.authorName}</h4>
                    <p className="text-sm text-gray-600">{post.date}</p>
                </div>
            </div>
            <p className="mb-4 text-left">{post.content}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <img src={`http://127.0.0.1:7001/uploads/${post.images}`} alt={post.id} className="rounded-lg"/>
            </div>
            <div className="flex justify-between text-gray-600">
                <div className="flex items-center">
                    <img src={like_icon} alt="like_icon" className={"w-6 h-6 mr-2"}/>
                    <span>{post.likes}</span>
                </div>
                <div className="flex items-center">
                    <img src={comment_icon} alt="comment_icon" className="w-6 h-6 mr-2"/>
                    <span>{post.comments.length}</span>
                </div>
                <div className="flex items-center">
                    <img src={share_icon} alt="share_icon" className="w-6 h-6 mr-2"/>
                    <span>{post.shares}</span>
                </div>
            </div>
            <div className="mt-4">
                <h5 className="text-lg font-bold mb-2">评论</h5>
                {comments.map(comment => (
                    <div key={comment.id} className="mb-2">
                        <p className="text-sm text-gray-800 text-left">
                            <strong>{comment.creatorName}</strong>: {comment.text}
                        </p>
                    </div>
                ))}
                <div className="flex items-center mt-4">
                <input
                        type="text"
                        value={newCommentText}
                        onChange={e => setNewCommentText(e.target.value)}
                        placeholder="添加评论..."
                        className="w-full border rounded-lg p-2"
                    />
                    <button
                        onClick={() => {
                            addComment(post.id, newCommentText);
                            setNewCommentText('');
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 w-20"
                    >
                        发布
                    </button>
                </div>
            </div>
        </div>
    );
};

const samplePosts = [
    {
        authorName: '小枫',
        authorAvatar: 'https://example.com/avatar.jpg',
        date: '2024/06/25',
        content: '今天喝大红袍。中火，炭火香带着点花香，香气非常高...',
        images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
            'https://example.com/image3.jpg',
            'https://example.com/image4.jpg',
        ],
        likes: 11,
        comments: 3,
        shares: 1,
    },
    {
        authorName: '小李',
        authorAvatar: 'https://example.com/avatar.jpg',
        date: '2024/07/25',
        content: '今天跳坤坤舞，小黑鸡子很好吃...',
        images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
            'https://example.com/image3.jpg',
            'https://example.com/image4.jpg',
        ],
        likes: 65,
        comments: 3,
        shares: 9,
    },
    // 可以添加更多帖子
];

