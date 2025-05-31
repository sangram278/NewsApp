import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/news/1/general" />} />
        <Route path="/news/:page/:category" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
