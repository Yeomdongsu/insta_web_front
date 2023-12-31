import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/main' element={<Main />} />
        <Route path='mypage' element={<MyPage />}/>
        <Route path='*' element={<div style={{paddingTop:"100px", textAlign:"center", fontSize:"30px"}}>없는 페이지입니다.</div>} />
      </Routes>
    </>
  );
}

export default App;
