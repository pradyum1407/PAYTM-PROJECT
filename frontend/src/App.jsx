import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Send from "./Pages/Send"
import Home from "./Pages/Home";
import Failed from "./Pages/Failed"
import Success from "./Pages/Success"
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>  //protect the route from unauthorized user
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Send" element={< Send />} />
            <Route path="/transfer-succesfull" element={<Success />} />
            <Route path="/transfer-failed" element={<Failed />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
