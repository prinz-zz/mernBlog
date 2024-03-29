import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';
import Footerr from './components/Footerr';
import PrivateRoutes from './components/PrivateRoutes';

import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
 
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route element={<PrivateRoutes/>}>
          <Route path='/dashboard' element={<Dashboard/>} />
          </Route>
          <Route path='/signin' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
        <Footerr/>
      </BrowserRouter>
      
    </>
  )
}

export default App
