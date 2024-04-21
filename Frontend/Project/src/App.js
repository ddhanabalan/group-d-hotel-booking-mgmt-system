import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./page/Home";
import Login from "./page/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage } from "./page/ErrorPage";
import GlobleCotext from "./contextApi/GlobleContex";
import Register from "./page/Register";

function App() {
  return (
    <>
    <GlobleCotext>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
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
