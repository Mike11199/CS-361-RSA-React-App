
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import RSAPage from './components/RSAPage';
import AESPage from './components/AESPage';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/rsa" element={<RSAPage />}></Route>
      <Route path="/aes" element={<AESPage />}></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>  
    </Routes>
    </>
  );
}

export default App;
