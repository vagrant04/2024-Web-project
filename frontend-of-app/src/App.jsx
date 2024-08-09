import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//导入LoginForm等组件
import LoginForm from './Pages/LoginForm.jsx'
import HomePage from './Pages/HomePage.jsx'
import CreatePost from "./Pages/CreatePost.jsx";
import CreateCircle from "./Pages/CreateCircle.jsx";
import CirclePage from "./Pages/CirclePage.jsx";

function App() {
  return (
      <>
          <Router>
              <Routes>
                  <Route path="/" element={<LoginForm />} />
                  <Route path="/HomePage" element={<HomePage />} />
                  <Route path="/CreateCircle" element={<CreateCircle />} />
                  <Route path="/CreatePost/:circleId" element={<CreatePost />} />
                  <Route path="/CirclePage/:circleId" element={<CirclePage/>} />
              </Routes>
          </Router>
      </>
  );
}

export default App
