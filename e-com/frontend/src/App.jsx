import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import Navbars from './components/Navbars';
import Home from "./components/Home"
import Footer from './components/Footer';
import Available from './components/components/cars/Available';
import Book from "./components/Book"
import ScrollToTop from './components/ScrollToTop';
import Mybook from './components/components/bookings/Mybook';

const App = () => {
  return (
    <Router>
      <Navbars/>
        <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/cars' element={<Available/>}></Route>
        <Route path='/booking/:id' element={<Book/>}></Route>
         <Route path='/book' element={<Mybook/>}></Route> 
         </Routes>
      <Footer/>
    </Router>
  )
}

export default App