import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductFetcher from './components/ProductFetcher'
import Navbar from './components/Navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar></Navbar>
      <ProductFetcher />
      </div>
    </>
  )
}

export default App
