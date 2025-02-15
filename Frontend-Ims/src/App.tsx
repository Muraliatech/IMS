import React from 'react'
import {Home} from "./Components/Home/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from './Components/Signin';
import { Signup } from './Components/Signup';
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
