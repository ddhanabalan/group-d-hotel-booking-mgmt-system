import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./page/Home";
import Login from "./page/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage } from "./page/ErrorPage";
import GlobleCotext from "./contextApi/GlobleContex";
import SignUp from "./page/SignUp";

function App() {
  return (
    <>
    <GlobleCotext>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
      </GlobleCotext>
    </>
  );
}

export default App;
