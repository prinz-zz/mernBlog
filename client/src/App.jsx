import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import CreatePost from './pages/CreatePost';
import Header from './components/Header';
import Footerr from './components/Footerr';
import PrivateRoutes from './components/PrivateRoutes';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';

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
          <Route element={<OnlyAdminPrivateRoute/>}>
            <Route path='/create-post' element={<CreatePost/>} />
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
