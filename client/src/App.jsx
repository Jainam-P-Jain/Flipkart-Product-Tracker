import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductFetcher from './components/ProductFetcher/ProductFetcher'
import HomePage from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import ExploreProducts from './components/ExploreProducts/ExploreProducts.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <Routes>
        <Route path="/" element={<ProductFetcher />} /> 
          <Route path="/explore" element={<HomePage />} /> 
          <Route path="/product/:id" element={<ProductFetcher />} /> 
          <Route path="/explore/:title" element={<ExploreProducts />} /> 

        </Routes>
      </div>
    </Router>
  );
}

export default App
