import React from "react"
import SignUp from "./Components/SignUp.jsx"
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Components/Login.jsx"


function App() {

  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App