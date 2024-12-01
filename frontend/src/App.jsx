import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Send from "./Pages/Send"
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Signin" element={<Signin/>} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      <Route path="/Send" element={< Send/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
