
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//导入LoginForm组件
import LoginForm from './Pages/LoginForm.jsx'
import HomePage from './Pages/HomePage.jsx'
import CreatePost from "./Pages/CreatePost.jsx";
import CreateComment from "./Pages/CreateComment.jsx";
import CreateCircle from "./Pages/CreateCircle.jsx";
import CirclePage from "./Pages/CirclePage.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
          <Router>
              <Routes>
                  <Route path="/" element={<LoginForm />} />
                  <Route path="/HomePage" element={<HomePage />} />
                  <Route path="/CreateCircle" element={<CreateCircle />} />
                  <Route path="/CreatePost/:circleId" element={<CreatePost />} />
                  <Route path="/CreateComment" element={<CreateComment />} />
                  <Route path="/CirclePage/:circleId" element={<CirclePage />} />
              </Routes>
          </Router>
          {/*<div id="app"></div>*/}
          {/*<nav>*/}
          {/*    <ul>*/}
          {/*        <li><a href="#/">首页</a></li>*/}
          {/*        <li><a href="#/about">关于我们</a></li>*/}
          {/*        <li><a href="#/contact">联系方式</a></li>*/}
          {/*    </ul>*/}
          {/*</nav>*/}
          {/*<script type="module" src="/src/util/math.util.js"></script>*/}
          {/*<LoginForm/>*/}
          {/*<div>*/}
          {/*    <a href="https://vitejs.dev" target="_blank">*/}
          {/*        <img src={viteLogo} className="logo" alt="Vite logo"/>*/}
          {/*    </a>*/}
          {/*    <a href="https://react.dev" target="_blank">*/}
          {/*        <img src={reactLogo} className="logo react" alt="React logo"/>*/}
          {/*    </a>*/}
          {/*</div>*/}
          {/*<h1>Vite + React</h1>*/}
          {/*<div className="card">*/}
          {/*    <button onClick={() => setCount((count) => count + 1)}>*/}
          {/*        count is {count}*/}
          {/*    </button>*/}
          {/*    <p>*/}
          {/*        Edit <code>src/App.jsx</code> and save to test HMR*/}
          {/*    </p>*/}
          {/*</div>*/}
          {/*<p className="read-the-docs">*/}
          {/*    Click on the Vite and React logos to learn more*/}
          {/*</p>*/}

          {/*<LoginForm/>*/}
          {/*<div id="app"></div>*/}
      </>
  );
}

export default App
