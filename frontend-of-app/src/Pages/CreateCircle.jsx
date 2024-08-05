import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import 'tailwindcss/tailwind.css';
import axios from 'axios';

function CreateCircle() {
    const navigate = useNavigate();
    const [circleName, setCircleName] = useState('');
    const [circleImage, setCircleImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (circleName && circleImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                const circleData = {
                    name: circleName,
                    image: base64Image
                };

                addCircle(circleData);
                setCircleName('');
                setCircleImage(null);
            };
            reader.readAsDataURL(circleImage);
        }
    };

    function addCircle(circleData) {
        //向后端发送请求，创建兴趣圈
        axios.post('http://127.0.0.1:7001/circles/CreateCircles', circleData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Create New Circle:', response.data);
                navigate('/Homepage');
                // 处理成功的逻辑
            })
            .catch(error => {
                console.error('Error:', error);
                // 处理错误的逻辑
            });
    }
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">创建兴趣圈</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={circleName}
                    onChange={(e) => setCircleName(e.target.value)}
                    placeholder="兴趣圈名称"
                    className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <input
                    type="file"
                    onChange={(e) => setCircleImage(e.target.files[0])}
                    className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    onClick={handleSubmit}
                >
                    创建
                </button>
            </form>
        </div>
    );
}

export default CreateCircle;
