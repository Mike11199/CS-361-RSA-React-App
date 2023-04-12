
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import RSAPage from './components/RSAPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>}></Route>
      <Route path="/rsa" element={<RSAPage />}></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>  
    </Routes>
  );
}

export default App;
