import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from 'axios';

import {getCurrentUser} from "../util/currentUser.util.js";

export default function HomePage() {
    const navigate = useNavigate();
    const [circles, setCircles] = useState([]);

    useEffect(() => {
        // Fetch circles data from the backend
        // useEffect 是 React 中的一个 Hook，用于在函数组件中执行副作用操作。
        // 副作用操作包括数据获取、订阅、手动更改 DOM 等。
        // useEffect 接受一个函数和一个依赖项数组，
        // 当依赖项发生变化时，React 会执行该函数。
        axios.get('http://127.0.0.1:7001/circles/GetCircles')
            .then(response => {
                console.log('response.data: ', response.data);
                setCircles(response.data);
                console.log('circles: ', circles);
            })
            .catch(error => {
                console.error('Error fetching circles:', error);
            });
    }, [])//deps：依赖项

    const handleCreate = () => {
        // 创建圈子逻辑...
        // 创建成功后跳转到圈子主页
        navigate('/CreateCircle');
    }

    const handleJoin = (circleId) => {//进入兴趣圈
        console.log('用户点击了兴趣圈:', circleId);
        navigate(`/CirclePage/${circleId}`);
    };

    const currentUser = getCurrentUser();
    console.log('currentUser of HomePage: ', currentUser);

    return (
        <div className="max-w-6xl mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">发现圈子</h1>
                {currentUser && (
                    <div className="flex items-center">
                        <span className="text-gray-700 mr-3"><strong>{currentUser.username}</strong></span>
                        <img
                            src={`http://127.0.0.1:7001/uploads/${currentUser.avatar}`}
                            alt="avatar"
                            className="w-10 h-10 rounded-full mr-3"
                        />
                    </div>
                )}
            </div>

            <div className="flex border-b mb-8">
                <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-500 focus:outline-none">兴趣圈
                </button>
            </div>

            <div className="mb-8">
                <img src={`http://127.0.0.1:7001/pictures/HomePage_Picture.jpg`} alt="沃尔沃兴趣圈" className="w-full rounded-lg"/>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div className="flex space-x-4">
                    <div>
                        <label className="block text-gray-700">城市</label>
                        <select
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>南京市</option>
                            <option>北京市</option>
                            <option>上海市</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">类型</label>
                        <select
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>全部类型</option>
                            <option>体育类</option>
                            <option>娱乐类</option>
                        </select>
                    </div>
                </div>
                <button onClick={handleCreate} className="bg-blue-500 text-white py-2 px-4 rounded">创建兴趣圈</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {circles.map(circle => (
                    <div key={circle.id} className="bg-white rounded-lg shadow p-6">
                        <img src={`http://127.0.0.1:7001/uploads/${circle.imagePath}`} alt={circle.name} className="w-full h-48 object-cover rounded-t-lg"/>
                        <h2 className="mt-4 text-xl font-bold">{circle.name}</h2>
                        <p className="text-gray-500">创建者: {circle.creatorName} | 帖子数: {circle.posts.length}</p>
                        <button onClick={() => handleJoin(circle.id)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">进入兴趣圈</button>
                    </div>
                ))}
            </div>

            {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">*/}
            {/*    <div className="bg-white rounded-lg shadow p-6">*/}
            {/*        <img src="https://via.placeholder.com/100" alt="离奇博物志" className="w-full h-48 object-cover rounded-t-lg"/>*/}
            {/*        <h2 className="mt-4 text-xl font-bold">离奇博物志</h2>*/}
            {/*        <p className="text-gray-500">全国 | 90人</p>*/}
            {/*        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">加入</button>*/}
            {/*    </div>*/}
            {/*    <div className="bg-white rounded-lg shadow p-6">*/}
            {/*        <img src="https://via.placeholder.com/100" alt="听音者" className="w-full h-48 object-cover rounded-t-lg"/>*/}
            {/*        <h2 className="mt-4 text-xl font-bold">听音者</h2>*/}
            {/*        <p className="text-gray-500">全国 | 63人</p>*/}
            {/*        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">加入</button>*/}
            {/*    </div>*/}
            {/*    <div className="bg-white rounded-lg shadow p-6">*/}
            {/*        <img src="https://via.placeholder.com/100" alt="草根吃货圈" className="w-full h-48 object-cover rounded-t-lg"/>*/}
            {/*        <h2 className="mt-4 text-xl font-bold">草根吃货圈</h2>*/}
            {/*        <p className="text-gray-500">全国 | 51人</p>*/}
            {/*        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">加入</button>*/}
            {/*    </div>*/}
            {/*    <div className="bg-white rounded-lg shadow p-6">*/}
            {/*        <img src="https://via.placeholder.com/100" alt="沃们钓鱼趣" className="w-full h-48 object-cover rounded-t-lg"/>*/}
            {/*        <h2 className="mt-4 text-xl font-bold">沃们钓鱼趣</h2>*/}
            {/*        <p className="text-gray-500">全国 | 35人</p>*/}
            {/*        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">加入</button>*/}
            {/*    </div>*/}
            {/*    <div className="bg-white rounded-lg shadow p-6">*/}
            {/*        <img src="https://via.placeholder.com/100" alt="得闲饮茶" className="w-full h-48 object-cover rounded-t-lg"/>*/}
            {/*        <h2 className="mt-4 text-xl font-bold">得闲饮茶</h2>*/}
            {/*            <p className="text-gray-500">全国 | 33人</p>*/}
            {/*            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">加入</button>*/}
            {/*    </div>*/}
            {/*    <div className="bg-white rounded-lg shadow p-6">*/}
            {/*        <img src="https://via.placeholder.com/100" alt="探店日记" className="w-full h-48 object-cover rounded-t-lg"/>*/}
            {/*            <h2 className="mt-4 text-xl font-bold">探店日记</h2>*/}
            {/*            <p className="text-gray-500">全国 | 28人</p>*/}
            {/*            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">加入</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}
