
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>}></Route>
      <Route path="/rsa" element={<h1>RSA Page</h1>}></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>  
    </Routes>
  );
}

export default App;
