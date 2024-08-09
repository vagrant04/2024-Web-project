import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import 'tailwindcss/tailwind.css';
import axios from 'axios';

import {getCurrentUser} from "../util/currentUser.util.js";

function CreateCircle() {
    const navigate = useNavigate();
    const [circleName, setCircleName] = useState('');
    const [circleImage, setCircleImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (circleName && circleImage) {
            const formData = new FormData();
            formData.append('name', circleName);

            const currentUser = getCurrentUser();
            formData.append('creatorId', currentUser.id);

            const fileInput = document.querySelector('input[type="file"]');
            const file = fileInput.files[0];
            formData.append('file', file);

            // Debugging: Log FormData content
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            console.log('FormData:', formData);
            console.log('File details:', file.name, file.size, file.type);

            addCircle(formData);
            setCircleName('');
            setCircleImage(null);
        }
    };

    function addCircle(formData) {
        fetch('http://127.0.0.1:7001/circles/CreateCircles', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Create New Circle:', data);
                navigate('/Homepage');
            })
            .catch(error => {
                console.error('Error:', error);
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
